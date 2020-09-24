import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawerContent from './navigation/Menu';
import {Icon, Header} from './Component';
import {Images, materialTheme} from './constants/';
import RegisterComponent from './Screen/User/Register/Register';
import LoginComponent from './Screen/User/Login/Login';
import DashboardComponent from './Screen/Dashboard/dashboard';
import mytheme from './constants/Theme';
import InputComponent from './Screen/InputDetails/imputDetail';
import HistoryComponent from './Screen/History/history';
import SellerComponent from './Screen/Riders/index';
import AboutComponent from './Screen/Basic/Aboutus';
import ContactComponent from './Screen/Basic/Contact';
import PrivacyComponent from './Screen/Basic/privacy';
import TermsComponent from './Screen/Basic/Terms';
import ReviewComponent from './Screen/ReviewScreen/Review';
import BecomeComponent from './Screen/BecomeSeller/becomeSeller'
import VesselListComp from './Screen/Seller/Profile/index';

const {width} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const profile = {
  avatar: Images.Profile,
  name: 'Rachel Brown',
  type: 'Seller',
  plan: 'Pro',
  rating: 4.8,
};

let RegisterStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="RegisterStack">
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let RiderListComp = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="RiderListScreen">
      <Stack.Screen
        name="RiderListScreen"
        component={SellerComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let BecomeStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="BecomeScreen">
      <Stack.Screen
        name="BecomeScreen"
        component={BecomeComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let VesselStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="VesselListScreen">
      <Stack.Screen
        name="VesselListScreen"
        component={VesselListComp}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let ReviewStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="ReviewScreen">
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let AboutStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="AboutScreen">
      <Stack.Screen
        name="AboutScreen"
        component={AboutComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let ContactStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="ContactScreen">
      <Stack.Screen
        name="ContactScreen"
        component={ContactComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let PrivacyStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="PrivacyScreen">
      <Stack.Screen
        name="PrivacyScreen"
        component={PrivacyComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};



let TermStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="TermScreen">
      <Stack.Screen
        name="TermScreen"
        component={TermsComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};



let HisotryStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="HistoryScreen">
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

let LoginStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
let DashboardStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};



let InputStack = (props) => {
  return (
    <Stack.Navigator
      mode="card"
      headerMode="screen"
      initialRouteName="InputScreen">
      <Stack.Screen
        name="InputScreen"
        component={InputComponent}
        options={{
          header: ({navigation, scene}) => (
            <React.Fragment></React.Fragment>
            // <Header
            //   // search
            //   // tabs
            //   title="Home"
            //   navigation={navigation}
            //   scene={scene}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  );
};



const AppStack = (props) => {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: mytheme.COLORS.FUELSTATUS,
        inactiveBackgroundColor: 'transparent',

        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: 'center',
          alignContent: 'center',
          // alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: 'normal',
        },
      }}
      drawerPosition="right"
      initialRouteName={props.route}>
      <Drawer.Screen
        name="RegisterScreen"
        component={RegisterStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="LoginScreen"
        component={LoginStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
<Drawer.Screen
        name="RiderListScreen"
        component={RiderListComp}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
    

      <Drawer.Screen
        name="DashboardScreen"
        component={DashboardStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ContactScreen"
        component={ContactStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="AboutScreen"
        component={AboutStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ReviewScreen"
        component={ReviewStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="PrivacyScreen"
        component={PrivacyStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TermScreen"
        component={TermStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

    
  

      <Drawer.Screen
        name="InputScreen"
        component={InputStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />

    
      <Drawer.Screen
        name="HistoryScreen"
        component={HisotryStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BecomeScreen"
        component={BecomeStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
         <Drawer.Screen
        name="VesselListScreen"
        component={VesselStack}
        options={{
          drawerIcon: ({focused}) => (
            <Icon
              size={16}
              name="dashboard"
              family="MaterialIcons"
              color={focused ? 'white' : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

class Appmain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <AppStack route={this.props.route} />
      </NavigationContainer>
    );
  }
}

export default Appmain;
