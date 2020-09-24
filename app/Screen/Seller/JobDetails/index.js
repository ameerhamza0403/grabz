import React, {Component} from 'react';
import {Text, View, Dimensions, StatusBar, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import MapViewDirections from 'react-native-maps-directions';
import {Header} from '../../../Component';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Theme from '../../../constants/Theme';
import {Icon, Block} from 'galio-framework';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Grid, Col} from 'native-base';
import LoadingComponent from '../../../Component/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('screen');
export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      isLoading: false,
      selectedOrder: {},
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

    const data = JSON.parse(await AsyncStorage.getItem('@selected_order'));
    console.log(JSON.stringify(data.startDate, data.retDate));
    data.intent = data.intent.join(', ');
    data.equipment = data.equipment.join(', ');
    data.food = data.food.join(', ');
    this.setState({
      selectedOrder: data,

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

        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            paddingVertical: 10,
            backgroundColor: 'white',
          }}>
          {'Trip Details'.toUpperCase()}
        </Text>
        {this.state.isLoading && <LoadingComponent />}
        <ScrollView>
          {!this.state.isLoading && (
            <React.Fragment>
              <View
                style={{
                  padding: 10,
                  marginBottom: 100,
                }}>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.2}}>
                    <Icon
                      size={25}
                      color={'gray'}
                      family="Entypo"
                      name="location-pin"
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.location}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.2}}>
                    <Icon
                      size={25}
                      color={'gray'}
                      family="Entypo"
                      name="email"
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.email}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.2}}>
                    <Icon
                      size={25}
                      color={'gray'}
                      family="Entypo"
                      name="phone"
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.phone}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.2}}>
                    <Icon
                      size={25}
                      color={'gray'}
                      family="Entypo"
                      name="user"
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: width / 1.05,
                    height: 1,
                    backgroundColor: 'black',
                    marginVertical: 10,
                  }}></View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Drive
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.drive}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Vacancy
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.vacancy}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Length
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.length}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Status
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Theme.COLORS.SEAGREEN,
                      }}>
                      {this.state.selectedOrder.status}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      INTENT
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {this.state.selectedOrder.intent}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Equipment Supplied
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {this.state.selectedOrder.equipment}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Food Supplied
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {this.state.selectedOrder.food}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Date Departure
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {`${this.state.selectedOrder.startDate}`.split('T')[0]}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Date Return
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {`${this.state.selectedOrder.retDate}`.split('T')[0]}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Departure Time
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {`${this.state.selectedOrder.selectedStartDepTime} - ${this.state.selectedOrder.selectedEndDepTime}`}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Return Time
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        // backgroundColor: Theme.COLORS.SEADARK,
                        // borderRadius: 25,
                        // padding: 10,
                        // width: width / 3,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        // textAlign: 'center',
                      }}>
                      {`${this.state.selectedOrder.selectedStartRetTime} - ${this.state.selectedOrder.selectedEndRetTime}`}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: Theme.COLORS.SEADARK,
                      }}>
                      Operator
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={async () => {
                        await AsyncStorage.setItem(
                          '@seller',
                          JSON.stringify({
                            name: this.state.selectedOrder.operator.name,
                            id: this.state.selectedOrder.operator.id,
                          }),
                        );
                        this.props.navigation.navigate('HistoryScreen');
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          // backgroundColor: Theme.COLORS.SEADARK,
                          // borderRadius: 25,
                          // padding: 10,
                          // width: width / 3,
                          marginHorizontal: 5,
                          marginVertical: 5,
                          // textAlign: 'center',
                        }}>
                        {this.state.selectedOrder.operator &&
                          this.state.selectedOrder.operator.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {this.state.selectedOrder.status == 'pending' && (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={async () => {
                        this.setState({isLoading: true});
                        let user = JSON.parse(
                          await AsyncStorage.getItem('@user_info'),
                        );
                        await firestore()
                          .collection('trips')
                          .doc(this.state.selectedOrder.id)
                          .update({
                            operator: {
                              id: user.id,
                              name: user.name,
                            },
                            status: 'ongoing',
                          });
                        this.setState({
                          isLoading: false,
                        });
                        this.props.navigation.goBack();
                      }}>
                      <Text
                        style={{
                          backgroundColor: Theme.COLORS.SEADARK,
                          padding: 5,
                          paddingVertical: 10,
                          borderRadius: 5,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Apply on the job offer
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </React.Fragment>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
