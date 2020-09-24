import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  ImageBackground,
  Image,
  Linking,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import MapViewDirections from 'react-native-maps-directions';
import {Header} from '../../Component';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Theme from '../../constants/Theme';
import {Icon, Block} from 'galio-framework';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Grid, Col} from 'native-base';
import LoadingComponent from '../../Component/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import ModalComplete from './markcomplete';
import Bold from '../../Component/bold';
import getDirections from 'react-native-google-maps-directions'

const {width, height} = Dimensions.get('screen');
export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      isLoading: false,
      selectedOrder: {},
      openModal: false,
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
    console.log('%%%$$%$%$%$%', data.sellers);
    this.setState({
      selectedOrder: data,
      isLoading: false,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar
          backgroundColor={Theme.COLORS.SEANORMAL}
          barStyle="light-content"
        />
        <Header />
        <ModalComplete
          data={this.state.selectedOrder}
          open={this.state.openModal}
          close={() => this.setState({openModal: false})}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            paddingVertical: 10,
            backgroundColor: 'white',
          }}>
          {'Task Details'.toUpperCase()}
        </Text>
        {this.state.isLoading && <LoadingComponent />}
        <ScrollView>
          {!this.state.isLoading && (
            <React.Fragment>
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
                <Bold center>{this.state.selectedOrder.name}</Bold>

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
                        text="WEIGHT"
                        icon={{
                          name: 'gift',
                          color: 'black',
                          size: 25,
                          family: 'AntDesign',
                        }}>
                        {this.state.selectedOrder.weight}
                      </Bold>
                    </Col>
                    <Col style={{width: '50%'}}>
                      <Bold
                        underline
                        text="EXPECTED PRICE"
                        icon={{
                          name: 'tags',
                          color: 'black',
                          size: 25,
                          family: 'AntDesign',
                        }}>
                        {this.state.selectedOrder.budget}
                      </Bold>
                    </Col>
                  </Grid>
                  <Grid>
                    <Col style={{width: '50%'}}>
                      <Bold
                        // underline
                        text="DISTANCE"
                        icon={{
                          name: 'car',
                          color: 'black',
                          size: 25,
                          family: 'AntDesign',
                        }}>
                        {this.state.selectedOrder.distance}
                      </Bold>
                    </Col>
                    <Col style={{width: '50%'}}>
                      <Bold
                        // underline
                        text="DURATION"
                        icon={{
                          name: 'clockcircle',
                          color: 'black',
                          size: 25,
                          family: 'AntDesign',
                        }}>
                        {this.state.selectedOrder.duration}
                      </Bold>
                    </Col>
                  </Grid>
                </View>

                <Bold
                  size={15}
                  text="ITEM"
                  icon={{
                    name: 'paperclip',
                    color: 'black',
                    size: 40,
                    family: 'AntDesign',
                  }}>
                  {this.state.selectedOrder.itemName}
                </Bold>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri:
                        this.state.selectedOrder.image ||
                        'https://www.clipartkey.com/mpngs/m/99-996212_box-with-items-clipart.png',
                    }}
                    style={{
                      height: width / 1.5,
                      width: width / 1.5,
                      borderRadius: 10,
                      overflow: 'hidden',
                      borderWidth: 5,
                      borderColor: 'gray',
                      marginVertical: 20,
                    }}
                  />
                </View>

                <TouchableOpacity 
                  onPress={()=>{

                    const data = {
                      source: {
                       latitude: this.state.selectedOrder.pickUpLatitude,
                       longitude: this.state.selectedOrder.pickUpLongitude
                     },
                     destination: {
                       latitude: this.state.selectedOrder.DropLatitude,
                       longitude: this.state.selectedOrder.DropLongitude
                     },
                     params: [
                       {
                         key: "travelmode",
                         value: "driving"        // may be "walking", "bicycling" or "transit" as well
                       },
                       {
                         key: "dir_action",
                         value: "navigate"       // this instantly initializes navigation using the given travel mode
                       }
                     ],
                     
                   }
                
                   getDirections(data)
                  }}
                >
                  <Bold
                    underline
                    text={
                      this.state.selectedOrder.AddressPickUp &&
                      this.state.selectedOrder.AddressPickUp.format
                    }
                    icon={{
                      name: 'map-pin',
                      color: 'black',
                      size: 40,
                      family: 'Feather',
                    }}>
                    PICKUP ADDRESS
                  </Bold>

                <Bold
                  text={
                    this.state.selectedOrder.AddressDrop &&
                    this.state.selectedOrder.AddressDrop.format
                  }
                  icon={{
                    name: 'map-pin',
                    color: 'black',
                    size: 40,
                    family: 'Feather',
                  }}>
                  DROP ADDRESS
                </Bold>
                </TouchableOpacity>

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
                      Linking.openURL(
                        `mailto:${this.state.selectedOrder.email}`,
                      )
                    }>
                    <Bold
                      style={{marginTop: 50}}
                      // underline
                      text={this.state.selectedOrder.email}
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
                      Linking.openURL(`tel:${this.state.selectedOrder.phone}`)
                    }>
                    <Bold
                      // underline
                      text={this.state.selectedOrder.phone}
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
                <View
                  style={{
                    marginTop: 50,
                    marginBottom: 20,
                  }}>
                  {this.state.selectedOrder.sellers &&
                    this.state.selectedOrder.sellers.map((e) => {
                      return (
                        <>
                          <Grid
                            style={{
                              backgroundColor:
                                e.id == this.state.selectedOrder.sellerId
                                  ? Theme.COLORS.SEALIGHT
                                  : 'lightgray',
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
                                  this.props.navigation.navigate(
                                    'VesselListScreen',
                                  );
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
                                        source={{
                                          uri:
                                            'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
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
                                      flex: 0.6,
                                      paddingHorizontal: 15,
                                      paddingVertical: 10,
                                    }}>
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                      }}>
                                      {e.name}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{width: '14%', padding: 5}}>
                              {this.state.selectedOrder.sellerId == '' && (
                                <TouchableOpacity
                                  onPress={() => {
                                    Alert.alert(
                                      'Are you Sure?',
                                      "By clicking 'YES' this driver will be managing your package",
                                      [
                                        {
                                          text: 'Cancel',
                                          onPress: () =>
                                            console.log('Cancel Pressed'),
                                          style: 'cancel',
                                        },
                                        {
                                          text: 'OK',
                                          onPress: async () => {
                                            firestore()
                                              .collection('jobs')
                                              .doc(this.state.selectedOrder.id)
                                              .update({
                                                sellerId: e.id,
                                                status: 'assigned',
                                              });
                                            //  this.getDate();
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
                                    color="gray"
                                  />
                                </TouchableOpacity>
                              )}
                            </Col>
                          </Grid>
                        </>
                      );
                    })}
                </View>

                {this.state.selectedOrder.sellerId !== '' &&
                  this.state.selectedOrder.status != 'completed' && (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({openModal: true});
                        }}>
                        <Text
                          style={{
                            backgroundColor: Theme.COLORS.SEAGREEN,
                            padding: 5,
                            paddingVertical: 10,
                            borderRadius: 5,
                            textAlign: 'center',
                            marginBottom: 50,
                            color: 'white',
                          }}>
                          Mark Job as complete
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
