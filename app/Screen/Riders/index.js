import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Alert,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../../constants/Theme';
import {Header} from '../../Component';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Grid, Col} from 'native-base';
import {Icon} from 'galio-framework';
import firestore from '@react-native-firebase/firestore';
import LoadingComponent from '../../Component/Loader';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('screen');

export default class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      orderData: [],
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
    const data = await firestore()
      .collection('rider')
      // .doc()
      // .where('userId', '==', user.id)
      // .orderBy('date')
      .get();
    let arr = [];
    data.forEach((e) => {
      arr.push(e.data());
    });
    console.log(arr);
    this.setState({
      orderData: arr,
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
          {'Drivers List'.toUpperCase()}
        </Text>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 30,
              marginBottom: width / 2,
            }}>
            {this.state.orderData.map((e) => (
              <Grid
                style={{
                  backgroundColor: 'lightgray',
                  borderRadius: 10,
                  height: width / 3,
                  elevation: 5,
                  marginVertical: 5,
                }}>
                <Col style={{width: '86%', padding: 10}}>
                  <TouchableOpacity
                    onPress={async () => {
                      await AsyncStorage.setItem(
                        '@selected_order',
                        JSON.stringify(e),
                      );
                      this.props.navigation.navigate('VesselListScreen');
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.4}}>
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 100,
                            borderWidth: 0.1,
                          }}>
                          <ImageBackground
                            source={{uri: 'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'}}
                            style={{
                              width: '100%',
                              height: '100%',
                              overflow: 'hidden',
                              borderRadius: 90,
                            }}
                          />
                        </View>
                      </View>
                      <View style={{flex: 0.6, paddingHorizontal: 15, paddingVertical:10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{e.name}</Text>
                        <Text >{e.vehicalName}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={{width: '14%', padding: 5}}>
                  {e.status == 'pending' && (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Are you Sure?',
                          "By Clicking 'YES' the job will be cancelled and the amount will be transfered back to you depending upon the return policy",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: async () => {
                                firestore()
                                  .collection('jobs')
                                  .doc(e.id)
                                  .update({
                                    status: 'cancelled',
                                  });
                                this.getDate();
                              },
                            },
                          ],
                          {cancelable: false},
                        );
                      }}>
                      <Icon
                        name="delete"
                        family="AntDesign"
                        size={34}
                        color="gray"
                      />
                    </TouchableOpacity>
                  )}
                </Col>
              </Grid>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
