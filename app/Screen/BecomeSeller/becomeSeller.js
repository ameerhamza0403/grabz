import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../Component';
import {theme} from 'galio-framework';
import Theme from '../../constants/Theme';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingComponent from '../../Component/Loader';

const {width, height} = Dimensions.get('screen');
export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <SafeAreaView>
          <StatusBar
            backgroundColor={Theme.COLORS.SEADARK}
            barStyle="light-content"
          />
          <Header />
          {this.state.isloading && <LoadingComponent />}
          <View
            style={{
              //   backgroundColor: 'red',
              width: width,
              height: width,
            }}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  this.setState({isloading: true});
                  const data = JSON.parse(
                    await AsyncStorage.getItem('@user_info'),
                  );
                  await firestore().collection('Users').doc(data.id).update({
                    userType: 'seller',
                  });
                  await firestore().collection('funds').doc(data.id).set({
                    cash: 0,
                    id: data.id,
                    monthly: 0,
                    total: 0,
                  });
                  this.setState({isloading: false});
                  Alert.alert('Please restart the app to see the changes');
                } catch (err) {
                  console.log('Error!', err);
                }
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: width / 2,
                  backgroundColor: Theme.COLORS.SEAGREEN,
                  color: 'white',
                  borderRadius: 10,
                  padding: 10,
                  marginHorizontal: width / 8,
                }}>
                Become a Driver
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                margin: 30,
              }}>
              By clicking on this button you'll have to enter your details to
              register as an operator or sailor.
            </Text>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
