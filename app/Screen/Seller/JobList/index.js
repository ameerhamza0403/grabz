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
import Theme from '../../../constants/Theme';
import {Header} from '../../../Component';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Grid, Col} from 'native-base';
import {Icon} from 'galio-framework';
import firestore from '@react-native-firebase/firestore';
import LoadingComponent from '../../../Component/Loader';
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
      .collection('jobs')
      // .doc(user.id)
      .where('status', '==', 'pending')
      // .orderBy('date')
      .get();
    let arr = [];
    data.forEach((e) => {
      // if (e.data().status === 'pending') {
      arr.push(e.data());
      // }
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
          {'Jobs History'.toUpperCase()}
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
                      let data = e;
                      data.pickUpDate = e.pickUpDate.toDate();
                      await AsyncStorage.setItem(
                        '@selected_order',
                        JSON.stringify(data),
                      );
                      this.props.navigation.navigate('ReviewScreen');
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.3}}>
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 100,
                            borderWidth: 0.1,
                          }}>
                          <ImageBackground
                            source={{
                              uri:
                                'https://www.creativefabrica.com/wp-content/uploads/2019/04/Luggage-icon-by-hellopixelzstudio.jpg',
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              overflow: 'hidden',
                              borderRadius: 90,
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.7,
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>
                          {e.name}
                        </Text>
                        <Text>{e.itemName} to deliver</Text>
                        <Text>{e.weight}</Text>
                        <Text style={{fontWeight: 'bold', color: 'red'}}>
                          {e.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col style={{width: '14%', padding: 5}}>
                  {e.status == 'pending' && (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Apply for this job?',
                          "By clicking 'YES' your profile will be available to the recruiters.",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: async () => {
                                const user = JSON.parse(
                                  await AsyncStorage.getItem('@user_info'),
                                );

                                let sellersData = e.sellers;
                                sellersData.push({name: user.name,id:user.id});
                                firestore()
                                  .collection('jobs')
                                  .doc(e.id)
                                  .update({
                                    sellers: sellersData,
                                  });
                                // this.getDate();
                              },
                            },
                          ],
                          {cancelable: false},
                        );
                      }}>
                      <Icon
                        name="send"
                        family="Feather"
                        size={34}
                        color="black"
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
