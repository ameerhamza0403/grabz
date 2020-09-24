import React from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  SafeAreaView,
  View,
  TextInput,
} from 'react-native';
import {Block, Text, Input, Button} from 'galio-framework';
// import styles from './style';
const {width, height} = Dimensions.get('screen');
const OS = Platform.OS == 'ios' ? true : false;
import Icon from '../../../Component/Icon';
import theme from '../../../constants/Theme';
import themeStyle from '../../../Theme/mystyle';
import Theme from '../../../constants/Theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {emailRegex} from '../../../constants/variables';
import Loader from '../../../Component/Loader';

export default class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      phone: '',
      isLoading: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          backgroundColor={theme.COLORS.SEADARK}
          barStyle="light-content"
        />
        <ScrollView
          style={{
            backgroundColor: theme.COLORS.SEADARK,
          }}>
          {this.state.isLoading && <Loader />}
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Image
              style={{resizeMode: 'center', width: width, height: width / 2}}
              source={require('../../../../assets/grabz.png')}

            />
            <Text
              style={{
                fontSize: 50,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                // color: theme.COLORS.FUELBLUE
              }}>
              SIGN UP
            </Text>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={(text) => this.setState({name: text})}
                // value={'value'}
                placeholderTextColor={theme.COLORS.SEALIGHT}
                placeholder="Your Name"
                style={[themeStyle.roundedText, {marginTop: 8}]}
              />
              <TextInput
                onChangeText={(text) => this.setState({phone: text})}
                // value={'value'}
                placeholderTextColor={theme.COLORS.SEALIGHT}
                placeholder="Phone Number"
                keyboardType='number-pad'
                style={[themeStyle.roundedText, {marginTop: 8}]}
              />
              <TextInput
                onChangeText={(text) => this.setState({email: text})}
                // value={'value'}
                placeholderTextColor={theme.COLORS.SEALIGHT}
                keyboardType='email-address'
                placeholder="Email"
                style={[themeStyle.roundedText, {marginTop: 8}]}
              />
              <TextInput
                onChangeText={(text) => this.setState({password: text})}
                // value={'value'}
                placeholderTextColor={theme.COLORS.SEALIGHT}
                placeholder="Password"
                secureTextEntry
                style={[themeStyle.roundedText, {marginTop: 8}]}
              />
              {/* <TouchableOpacity
                onPress={() => {
                  
                }}> */}
              <Button
                style={{
                  width: width / 1.2,
                  // borderTopLeftRadius: 50,
                  // borderTopRightRadius: 50,
                  // borderBottomRightRadius: 50,
                  marginTop: 15,
                }}
                color={Theme.COLORS.SEAGREEN}
                onPress={() => {
                  if (
                    this.state.email.length < 1 ||
                    this.state.phone.length < 1 ||
                    this.state.name.length < 1 ||
                    this.state.password.length < 1 ||
                    !emailRegex.test(this.state.email)
                  ) {
                    Alert.alert(
                      'Invalid Entry or missing Fields',
                      'Please Enter correct email and Password',
                    );
                  } else {
                    this.setState({isLoading: true});
                    auth()
                      .createUserWithEmailAndPassword(
                        this.state.email,
                        this.state.password,
                      )
                      .then((res) => {
                        this.setState({
                          userId: res.user.uid,
                        });

                        firestore()
                          .collection('Users')
                          .doc(this.state.userId)
                          .set({
                            email: this.state.email.trim().toLowerCase(),
                            password: this.state.password,
                            id: this.state.userId,
                            dateJoin: new Date(),
                            name: this.state.name,
                            phone: this.state.phone,
                            userType: 'buyer',
                          })
                          .then((data) => {
                            this.setState({
                              isLoading: false,
                            });
                            Alert.alert(
                              'Congratulations ! Your Registration is Successfull,You can Login Now',
                            );
                            this.props.navigation.navigate('LoginScreen');
                          })
                          .catch((error) => {
                            this.setState({isLoading: false});
                            Alert.alert('Error Ocurred', JSON.stringify(error));
                          });
                        // this.props.navigation.navigate('FirstScreen');
                      })
                      .catch((error) => {
                        this.setState({isLoading: false});
                        Alert.alert('Error Occured', JSON.stringify(error));
                      });
                  }
                }}>
                SIGN UP
              </Button>
              {/* </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 18,
                  }}>
                  Already have an account? LOGIN
                </Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
