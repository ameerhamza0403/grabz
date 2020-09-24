/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import {Container, Root, Spinner} from 'native-base';
import Setup from './app/boot';
import theme from './app/constants/Theme';
import Theme from './app/constants/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';

const {width, height} = Dimensions.get('screen');
const OS = Platform.OS == 'ios' ? true : false;

const store = configureStore();
const App = () => {
  const [isLoading, setIsLoading] = React.useState('');
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    checkCred();
  }, []);

  let checkCred = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('@login_details'));
      if (value !== null) {
        // value previously stored
        auth()
          .signInWithEmailAndPassword(value.email, value.password)
          .then(async (res) => {
            try {
              console.log('res', res);
              await AsyncStorage.setItem('@user_id', res.user.uid);
              const user = await firestore()
                .collection('Users')
                .where('id', '==', res.user.uid)
                .get();
              console.log('==========', user._docs[0].data());
              setUser(user._docs[0].data().userType);
              await AsyncStorage.setItem(
                '@user_info',
                JSON.stringify(user._docs[0].data()),
              );
              setIsLoading('DashboardScreen');
            } catch (error) {
              setIsLoading('LoginScreen');
            }
          })
          .catch((error) => {
            setIsLoading('LoginScreen');
          })
          .finally(() => {
            // this.setState({ showspin: false });
          });
      } else {
        setIsLoading('LoginScreen');
      }
    } catch (e) {
      // error reading value
    }
  };

  if (isLoading == '') {
    return <SplashScreen />;
  } else {
    // return <SplashScreen />
    return (
      <Provider store={store}>
        <Setup user={user} route={isLoading} />
      </Provider>
    );
  }
};

function SplashScreen(props) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.COLORS.SEADARK,
          }}>
          <StatusBar
            backgroundColor={theme.COLORS.SEADARK}
            barStyle="light-content"
          />

          <View
            style={{
              flexDirection: 'column',
            }}>
            {/* <View style={{flex: 1}}></View> */}
            <View style={{flex: 2, marginTop: width / 3}}>
              <Image
                source={require('./assets/grabz.png')}
                width={width}
                height={width}
                // style={{
                //   width: width,
                //   height: width
                // }}
              />
            </View>
            {/* <View style={{flex: 1, textAlign: 'center', alignItems: 'center'}}>
              <Text style={{
                fontSize: 16,
                color: Theme.COLORS.FUELBLUE
                // fontWeight: 'bold'
              }}>Mobile Gas Delivery Service</Text>
            </View> */}
            <View style={{flex: 1}}>
              <Spinner color={Theme.COLORS.SEALIGHTGREEN} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
