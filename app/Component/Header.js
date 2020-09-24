import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
  Linking,
  View
} from 'react-native';
import {Button, Block, NavBar, Input, Text} from 'galio-framework';
import theme from '../constants/Theme';
import Icon from './Icon';
import mytheme from '../Theme/mystyle';
const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  render() {
    const {back, title, white, transparent, navigation} = this.props;

    return (
      <Block
        row
        width={width}
        height={60}
        style={{backgroundColor: theme.COLORS.SEADARK}}>
        <Block flex row marginTop={10} style={{width: '100%'}}>
          <Block left flex paddingHorizontal={10}>
            {!this.props.hideBack && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <View
                  style={{
                    marginTop: 5,
                    // backgroundColor: 'yellow',
                    padding: 5
                  }}>
                  <Icon
                    family="AntDesign"
                    size={25}
                    name="left"
                    color={'black'}
                  />
                </View>
              </TouchableOpacity>
            )}
          </Block>

          <Block middle flex paddingHorizontal={10}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.COLORS.SEALIGHTGREEN,
              }}>
              GRABZ
            </Text>
            {/* <Image source={require('../../assets/floatstasm.png')}/> */}
          </Block>

          <Block flex right paddingHorizontal={10}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Icon
                family="AntDesign"
                size={40}
                name="menufold"
                color={theme.COLORS.SEAG}
              />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default withNavigation(Header);
