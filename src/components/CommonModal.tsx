/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import Strings from '../constants/Strings';
import { actualDeviceSize, dW } from '../utils/dynamicHeightWidth';
import { Colors } from '../utils/theme';
import Button from './Button';
import ComponentStyle from './ComponentStyle';
import { GdText } from './text/gd-text';

const CommonModel = ({ isVisible, close, button, message, onPressButton, title  }: any) => {

  return (
    <Modal isVisible={isVisible}
      hasBackdrop
      style={{ height: actualDeviceSize.height }}
      backdropOpacity={0.8}
      backdropColor={Colors.black}  >
      <TouchableOpacity onPress={() => close()} >
        <View style={ComponentStyle.update_modal}>
          <GdText style={[ComponentStyle.text_h1, { color: Colors.black }]} tx={title} />
          <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton2, ComponentStyle.marginTopButton4]} tx={message} />                     
          <Button heading={button} onPress={() => {
            close();
            onPressButton();
          }}
            exStyle={{
              width: '80%',
              marginTop: 30,
              color: button == 'delete_profile' ? Colors.white : Colors.black,
              backgroundColor: button == 'delete_profile' ? Colors.lightorange : Colors.green
            }}
          >{button}</Button>
          <TouchableOpacity onPress={() => close()} style={{marginTop: dW(24)}} hitSlop={10} >            
            <GdText style={[ComponentStyle.text_h2, { color: Colors.black }]} tx={"cancel"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CommonModel;
