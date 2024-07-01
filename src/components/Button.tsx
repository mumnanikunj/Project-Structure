/* eslint-disable react-native/no-inline-styles */

import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';

import Strings from '../constants/Strings';
import {dH, dW} from '../utils/dynamicHeightWidth';
import { Colors } from '../utils/theme';
import { GdText } from './text/gd-text';

interface ButtonProps {
  heading: string
  onPress: () => void
  exStyle: any
  isDisabled?: boolean
  textStyle?: any
  index? : number,
}

const Button: FC<ButtonProps> = ({heading, onPress, exStyle, textStyle ={}, isDisabled = false,index}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => onPress()}
      style={[
        {
          paddingHorizontal: dW(24),
          paddingVertical: dW(12),
          alignSelf: index === 0 ? 'flex-end' :'center',
          borderRadius: 50,
          overflow: 'hidden',
          // width: _.size(heading) < 7 ? dW(140) : _.size(heading) < 11 ? dW(200) :  dW(215),
          width:index === 0 ?  dW(171) :dW(297),
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          marginTop: dH(32),
          elevation: 5,
          backgroundColor: isDisabled ? Colors.gray : Colors.green
        },
        exStyle
      ]}
    >
      <GdText style={{
            letterSpacing: 0.5,
            color: heading === Strings.delete_profile ? Colors.white : Colors.white,
            fontSize: 16,
            // fontFamily: fonts.bold,
            fontWeight: '700',
            textAlign:'center',
            ...textStyle
          }} tx={heading} />
    </TouchableOpacity>
  )
}

export default Button
