import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../../../constants/Theme';
import {Header} from '../../../Component';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Grid, Col} from 'native-base';
import {Icon} from 'galio-framework';
import firestore from '@react-native-firebase/firestore';
import LoadingComponent from '../../../Component/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import Bold from '../../../Component/bold';

const {width, height} = Dimensions.get('screen');

export default class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sellerData: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getDate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  getDate = async () => {
    this.setState({
      isLoading: true,
    });
    let sellerData;
    const user = JSON.parse(await AsyncStorage.getItem('@user_info'));
    sellerData = await firestore().collection('rider').doc(user.id).get();

    this.setState({
      sellerData: sellerData.data(),
      isLoading: false,
    });
  };
  render() {
    return (
      <SafeAreaView>
        <StatusBar
          backgroundColor={Theme.COLORS.SEADARK}
          barStyle="light-content"
        />
        <Header />
        {this.state.isLoading && <LoadingComponent />}
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          {'My Profile'.toUpperCase()}
        </Text>

        <ScrollView>
          <React.Fragment>
            {this.state.sellerData && (
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 30,
                  marginBottom: 100,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
                    }}
                    style={{
                      height: width / 3,
                      width: width / 3,
                      borderRadius: 100,
                      overflow: 'hidden',
                      borderWidth: 5,
                      borderColor: 'gray',
                    }}
                  />
                </View>
                <Bold center>{this.state.sellerData.name}</Bold>

                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingBottom: 40,
                    paddingTop: 30,
                    marginBottom: 30,
                    backgroundColor: Theme.COLORS.SEALIGHT,
                    borderRadius: 20,
                    elevation: 6,
                  }}>
                  <Grid>
                    <Col style={{width: '50%'}}>
                      <Bold
                        underline
                        text="VEHICAL NAME"
                        icon={{
                          name: 'gift',
                          color: 'black',
                          size: 25,
                          family: 'AntDesign',
                        }}>
                        {this.state.sellerData.vehicalName}
                      </Bold>
                    </Col>
                    <Col style={{width: '50%'}}>
                      <Bold
                        underline
                        text="VEHICAL NUMBER"
                        icon={{
                          name: 'tags',
                          color: 'black',
                          size: 25,
                          family: 'AntDesign',
                        }}>
                        {this.state.sellerData.vehicalNumber}
                      </Bold>
                    </Col>
                  </Grid>
                </View>

                <Bold
                  // line
                  text={this.state.sellerData.address}
                  icon={{
                    name: 'map',
                    color: 'black',
                    size: 40,
                    family: 'MaterialCommunityIcons',
                  }}>
                  ADDRESS
                </Bold>

                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingBottom: 40,
                    marginVertical: 30,
                    backgroundColor: '#ffc599',
                    borderRadius: 20,
                    elevation: 6,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`mailto:${this.state.sellerData.email}`)
                    }>
                    <Bold
                      style={{marginTop: 50}}
                      // underline
                      text={this.state.sellerData.email}
                      icon={{
                        name: 'email',
                        color: 'black',
                        size: 40,
                        family: 'MaterialCommunityIcons',
                      }}>
                      EMAIL
                    </Bold>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`tel:${this.state.sellerData.phone}`)
                    }>
                    <Bold
                      // underline
                      text={this.state.sellerData.phone}
                      icon={{
                        name: 'phone',
                        color: 'black',
                        size: 40,
                        family: 'MaterialCommunityIcons',
                      }}>
                      PHONE
                    </Bold>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </React.Fragment>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
