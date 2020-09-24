import React from 'react-native';
import Theme from '../constants/Theme';
import { theme } from 'galio-framework';
const {Platform, Dimensions,StyleSheet} = React;
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
    roundedText: {
        height: 50,
        width: width / 1.2,
        backgroundColor: Theme.COLORS.SEALIGHTGREEN,
        // color: Theme.COLORS.FUELBLUE,
        color: 'white',
        borderWidth: 0.2,
        borderColor: Theme.COLORS.FUELBLUE,
        textAlign: 'center',
        // borderBottomRightRadius: 50,
        // borderBottomLeftRadius: 50,
        paddingHorizontal: 20,
        fontSize: 18,
      },
})