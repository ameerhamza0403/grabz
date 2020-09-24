import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {View, Text} from 'native-base';
const {width, height} = Dimensions.get('screen');

let LoadingComponent = (props) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        height: height,
        opacity: 0.6
      }}>
      <ActivityIndicator
        size={100}
        color={props.color ? props.color : 'white'}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: props.color?props.color:'white'
        }}>
        Loading..
      </Text>
    </View>
  );
};

export default LoadingComponent;
