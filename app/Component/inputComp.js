import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Theme from '../constants/Theme';
const {width, height} = Dimensions.get('screen');
export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <View
          style={{
            borderWidth: 1,
            borderColor: Theme.COLORS.SEADARK,
            borderRadius: 5,
            backgroundColor: 'white',
            marginBottom: 10,
            height: 55,
          }}>
          <Text
            style={{
              height: 15,
              paddingLeft: 10,
              fontSize: 12,
              fontWeight: 'bold',
              color: Theme.COLORS.SEAGREEN,
            }}>
            {this.props.label}
          </Text>
          {this.props.children}
        </View>
      </React.Fragment>
    );
  }
}
