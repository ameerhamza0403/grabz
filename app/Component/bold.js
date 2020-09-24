import {Icon} from 'galio-framework';
import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
export default class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        {this.props.line && (
          <View
            style={{
              height: 5,
              backgroundColor: '#f7c82c',
              marginHorizontal: 20,
              marginVertical: 10,
            }}></View>
        )}
        <View style={[this.props.style, {flexDirection: 'row'}]}>
          <View style={{flex: this.props.icon ? 0.2 : 0}}>
            {this.props.icon && (
              <Icon
                color={this.props.icon.color}
                size={this.props.icon.size}
                name={this.props.icon.name}
                family={this.props.icon.family}
              />
            )}
          </View>
          <View style={{flex: this.props.icon ? 0.8 : 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'gray',
                paddingVertical: 5,
                fontStyle: 'italic',
                fontSize: this.props.size || 20,
                textAlign: this.props.center ? 'center' : 'left',
              }}>
              {this.props.children}
            </Text>
          </View>
        </View>
        {this.props.text && (
          <Text style={{marginLeft: 10}}>{this.props.text}</Text>
        )}
        {this.props.underline && (
          <View
            style={{
              height: 3,
              backgroundColor: '#ffe182',
              marginHorizontal: 20,
              marginVertical: 10,
            }}></View>
        )}
      </React.Fragment>
    );
  }
}
