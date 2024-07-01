import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AppKeyboardAvoiding = (props: {children: any}) => {
  const {children} = props;
  const [enable, setEnable] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={StyleSheet.absoluteFill}
      keyboardShouldPersistTaps={"handled"} 
      onKeyboardDidShow={() => {setEnable(true);}}
      onKeyboardDidHide={() => {setEnable(false);}}
      scrollEnabled={enable}
      contentContainerStyle={styles.container}
      >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default AppKeyboardAvoiding;

const styles = StyleSheet.create({
  container: {flexGrow: 1}
});
