import {Icon} from 'galio-framework';
import {DatePicker, Picker} from 'native-base';
import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../Component';
import TextInputComp from '../../Component/inputComp';
import time from './time';
import ImagePicker from 'react-native-image-crop-picker';
import Theme from '../../constants/Theme';
import LoadingComponent from '../../Component/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {randomId} from '../../constants/variables';
import firebase from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const {width, height} = Dimensions.get('screen');
export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      weight: '',
      distance: '',
      duration: '',
      budget: '',
      pickupDate: '',
      pickupTime: '',
      images: null,
      isLoading: false,
    };
  }

  pickImage = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then((images) => {
      console.log(images);
      this.setState({
        images: images,
      });
    });
  };

  submit = async () => {
    // if (this.state.images == null) {
    //   Alert.alert(
    //     'All Fields are compulsory!',
    //     'It looks like that you have not attached images!',
    //   );
    //   console.log(this.state.epirb, this.state.radio);
    // } else
    if (
      this.state.distance.length < 1 ||
      this.state.duration.length < 1 ||
      this.state.pickupTime.length < 1 ||
      this.state.pickupDate.length < 1 ||
      this.state.itemName.length < 1 ||
      this.state.weight.length < 1 ||
      this.state.budget.length < 1
    ) {
      Alert.alert('All Fields are compulsory!');
    } else {
      let user = JSON.parse(await AsyncStorage.getItem('@user_info'));
      let location = JSON.parse(await AsyncStorage.getItem('@order_details'));
      this.setState({isLoading: true});
      let url = '';
      if (this.state.images !== null) {
        let idOfImg = randomId();
        await storage()
          .ref(`images/${idOfImg}`)
          .putFile(this.state.images.path);
        url = await storage().ref(`images/${idOfImg}`).getDownloadURL();
      }
      console.log('image:;', url);
      let id = randomId();
      await firebase().collection('jobs').doc(id).set({
        id: id,
        userId: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        duration: this.state.duration,
        pickUpTime: this.state.pickupTime,
        pickUpDate: this.state.pickupDate,
        budget: this.state.budget,
        image: url,
        itemName: this.state.itemName,
        weight: this.state.weight,
        distance: this.state.distance,
        pickUpLatitude: location.latitudeStart,
        pickUpLongitude: location.longitudeStart,
        DropLatitude: location.longitudeEnd,
        DropLongitude: location.latitudeEnd,
        AddressPickUp: location.FormattedAddressStart,
        AddressDrop: location.FormattedAddressDrop,
        status: 'pending',
        sellers: [],
        sellerId: '',
      });
      this.setState({isLoading: false});
      this.props.navigation.navigate('HistoryScreen');
    }
  };

  render() {
    return (
      <React.Fragment>
        <SafeAreaView>
          <Header />
          {this.state.isLoading && <LoadingComponent />}
          <ScrollView>
            <View style={{padding: 10, marginTop: 20, marginBottom: 150}}>
              <TextInputComp label={'Item Name'}>
                <TextInput
                  onChangeText={(text) => this.setState({itemName: text})}
                />
              </TextInputComp>
              <TextInputComp label={'Item Weight'}>
                <TextInput
                  onChangeText={(text) => this.setState({weight: text})}
                />
              </TextInputComp>
              <TextInputComp label={'Expected Distance'}>
                <TextInput
                  onChangeText={(text) => this.setState({distance: text})}
                />
              </TextInputComp>
              <TextInputComp label={'Your Budget'}>
                <TextInput
                  onChangeText={(text) => this.setState({budget: text})}
                />
              </TextInputComp>
              <TextInputComp label={'Pickup Date'}>
                <DatePicker
                  onDateChange={(text) => this.setState({pickupDate: text})}
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'calendar'}
                />
              </TextInputComp>
              <TextInputComp label={'Pickup Time'}>
                <Picker
                  mode="dialog"
                  placeholder="Select Hours"
                  iosIcon={
                    <Icon name="arrow-down" family={'Entypo'} size={20} />
                  }
                  placeholder="Select Hours"
                  textStyle={{color: 'gray'}}
                  itemStyle={{
                    backgroundColor: '#d3d3d3',
                    marginLeft: 0,
                    paddingLeft: 10,
                  }}
                  style={{width: '100%'}}
                  onValueChange={(text) => this.setState({pickupTime: text})}>
                  {time.map((f) => (
                    <Picker.Item label={f} value={f} />
                  ))}
                </Picker>
              </TextInputComp>
              <TextInputComp label={'Expected Duration'}>
                <TextInput
                  onChangeText={(text) => this.setState({duration: text})}
                />
              </TextInputComp>
              <Text style={{marginVertical: 5}}>Upload Vessel Images</Text>
              <TouchableOpacity onPress={this.pickImage}>
                <View
                  style={{
                    marginVertical: 5,
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: 'gray',
                    width: '100%',
                    height: width / 4,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    backgroundColor: this.state.images
                      ? Theme.COLORS.SEADARK
                      : 'transparent',
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    <Icon
                      name={this.state.images ? 'checkcircle' : 'upload'}
                      family="AntDesign"
                      color={this.state.images ? 'white' : 'gray'}
                      size={40}
                    />
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.submit}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: Theme.COLORS.SEADARK,
                    backgroundColor: Theme.COLORS.SEAGREEN,
                    padding: 20,
                    marginTop: 20,
                  }}>
                  Submit Job
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
