import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../Component';
import LoadingComponent from '../../../Component/Loader';
import Theme from '../../../constants/Theme';
import {Icon} from 'galio-framework';
import {Picker} from 'native-base';
import InputComp from '../../../Component/inputComp';
import ImagePicker from 'react-native-image-crop-picker';
import {randomId} from '../../../constants/variables';
import firebase from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('screen');

export default class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      vehicalName: '',
      vehicalNumber: '',
      name: '',
      email: '',
      phone: '',
      about: '',
      address: '',
    };
  }

  submit = async () => {
    if (
      this.state.about.length < 1 ||
      this.state.name.length < 1 ||
      this.state.email.length < 1 ||
      this.state.phone.length < 1 ||
      this.state.address.length < 1 ||
      this.state.vehicalName.length < 1 ||
      this.state.vehicalNumber.length < 1
    ) {
      Alert.alert('All Fields are compulsory!');
    } else {
      this.setState({isLoading: true});

      const user = JSON.parse(await AsyncStorage.getItem('@user_info'));
      await firebase().collection('rider').doc(user.id).set({
        userId: user.id,
        id: randomId(),
        about: this.state.about,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        vehicalName: this.state.vehicalName,
        vehicalNumber: this.state.vehicalNumber,
        address: this.state.address,
      });
      this.setState({isLoading: false});
      this.props.navigation.navigate('VesselListScreen');
    }
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
            fontSize: 14,
            fontWeight: 'bold',
            paddingVertical: 5,
          }}>
          Vehical Details
        </Text>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
              marginBottom: 100,
            }}>
            <InputComp label="About you">
              <TextInput
                value={this.state.about}
                onChangeText={(text) => this.setState({about: text})}
              />
            </InputComp>

            <InputComp label="Business Phone Number">
              <TextInput
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone: text})}
              />
            </InputComp>

            <InputComp label="Business Email">
              <TextInput
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
              />
            </InputComp>

            <InputComp label="Name">
              <TextInput
                value={this.state.name}
                onChangeText={(text) => this.setState({name: text})}
              />
            </InputComp>

            <InputComp label="Vehical Name">
              <TextInput
                value={this.state.vehicalName}
                onChangeText={(text) => this.setState({vehicalName: text})}
              />
            </InputComp>

            <InputComp label="Vehical Number">
              <TextInput
                value={this.state.vehicalNumber}
                onChangeText={(text) => this.setState({vehicalNumber: text})}
              />
            </InputComp>

            <InputComp label="Address">
              <TextInput
                value={this.state.address}
                onChangeText={(text) => this.setState({address: text})}
              />
            </InputComp>

            <TouchableOpacity onPress={this.submit}>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: Theme.COLORS.SEAGREEN,
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: 10,
                  marginVertical: 50,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
