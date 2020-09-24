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
import Icon from '../../../Component/Icon';
import theme from '../../../constants/Theme';
import themeStyle from '../../../Theme/mystyle';
import Theme from '../../../constants/Theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Component/Loader';
import {userlogin} from '../../../store/action/index';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('screen');
const OS = Platform.OS == 'ios' ? true : false;

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
        {this.state.isLoading && <Loader />}
        <ScrollView
          style={{
            backgroundColor: theme.COLORS.SEADARK,
          }}>
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
              }}>
              SIGN IN
            </Text>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <TextInput
                onChangeText={(text) => this.setState({email: text})}
                // value={'value'}
                placeholderTextColor={theme.COLORS.SEALIGHT}
                placeholder="Email"
                keyboardType="email-address"
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
              <TouchableOpacity
              // onPress={()=>this.props.navigation.navigate('DashboardScreen')}
              >
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
                      !(
                        this.state.email.length < 1 ||
                        this.state.password.length < 1
                      )
                    ) {
                      this.setState({isLoading: true});
                      auth()
                        .signInWithEmailAndPassword(
                          this.state.email.trim().toLowerCase(),
                          this.state.password,
                        )
                        .then(async (res) => {
                          try {
                            await AsyncStorage.setItem(
                              '@login_details',
                              JSON.stringify({
                                email: this.state.email,
                                password: this.state.password,
                              }),
                            );
                            await AsyncStorage.setItem(
                              '@user_id',
                              res.user.uid,
                            );
                            const user = await firestore()
                              .collection('Users')
                              .where('id', '==', res.user.uid)
                              .get();
                            await AsyncStorage.setItem(
                              '@user_info',
                              JSON.stringify(user._docs[0].data()),
                            );
                            this.props
                              .handleAuth(user._docs[0].data())
                              setTimeout(() => {
                                
                                console.log(this.props.userdata);
                                this.setState({isLoading: false});
                                this.props.navigation.navigate(
                                    'DashboardScreen',
                                  );
                                }, 5000);
                          } catch (error) {
                            this.setState({isLoading: false});
                            console.log(error)
                            Alert.alert('Error Occured ! ');
                          }
                        })
                        .catch((error) => {
                          this.setState({isLoading: false});

                          Alert.alert('Error', JSON.stringify(error.message));
                        })
                        .finally(() => {});
                    } else {
                      Alert.alert('Error', 'All fields are required');
                    }
                  }}>
                  SIGN IN
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('RegisterScreen')
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: Theme.COLORS.SEALIGHTGREEN,
                    textAlign: 'center',
                    marginTop: 18,
                  }}>
                  New here? SIGNUP
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 38,
                  }}>
                  Contact For Support
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAuth: (value) => dispatch(userlogin(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
