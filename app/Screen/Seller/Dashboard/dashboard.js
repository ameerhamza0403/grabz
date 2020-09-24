import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../Component';
import LoadingComponent from '../../../Component/Loader';
import Theme from '../../../constants/Theme';
import {Icon} from 'galio-framework';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('screen');

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      funds: {},
      user: {},
    };
  }

  componentDidMount() {
    this.getFunds();
  }

  getFunds = async () => {
    this.setState({isLoading: true});
    const userData = JSON.parse(await AsyncStorage.getItem('@user_info'));
    const data = await firestore().collection('funds').doc(userData.id).get();
    this.setState({
      funds: data.data(),
      user: userData,
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
        <Header hideBack />
        {this.state.isLoading && <LoadingComponent />}
        <ScrollView>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 10,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {`${'Hello'}  ${this.state.user.name}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.getFunds();
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 10,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {`${'Refresh Funds'.toUpperCase()}   `}
              <Icon color="gray" family="AntDesign" name="reload1" size={20} />
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.1,
              height: width / 2,
              backgroundColor: Theme.COLORS.SEAGREEN,
              padding: 10,
              marginVertical: 10,
              marginHorizontal: (width - width / 1.1) / 2,
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {'Total Earnings'.toUpperCase()}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 50,
                fontWeight: 'bold',
              }}>
              {this.state.funds.total || 0}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              USD
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.1,
              }}></View>
            <View
              style={{
                flex: 1,
                // width: width / 2.1,
                height: width / 2,
                backgroundColor: Theme.COLORS.FUELPINK,
                padding: 10,
                marginVertical: 10,
                // marginHorizontal: (width - width / 1.1) / 2,
                borderRadius: 10,
                elevation: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {'This Month Earnings'.toUpperCase()}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 50,
                  fontWeight: 'bold',
                }}>
                {this.state.funds.monthly || 0}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                USD
              </Text>
            </View>
            <View
              style={{
                flex: 0.1,
              }}></View>
            <View
              style={{
                flex: 1,
                // width: width / 2.1,
                height: width / 2,
                backgroundColor: Theme.COLORS.FUELORANGE,
                padding: 10,
                marginVertical: 10,
                //   marginHorizontal: width/2.1 ,
                borderRadius: 10,
                elevation: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {'This Month Cash Earnings'.toUpperCase()}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 50,
                  fontWeight: 'bold',
                }}>
                {this.state.funds.cash || 0}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                USD
              </Text>
            </View>
            <View
              style={{
                flex: 0.1,
              }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
