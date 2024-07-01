import React from 'react'
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import images from '../assets/images'
import Strings from '../constants/Strings'
import { dH, dW } from '../utils/dynamicHeightWidth'
import { Colors } from '../utils/theme'
import Button from './Button'
import ComponentStyle from './ComponentStyle'
import { GdText } from './text/gd-text'

const AppNoInternetSheet = ({visible = false, onClick, setVisible}: any) => {

  return (
    <Modal
      visible={visible}
      transparent
    >
      <View style={styles.mainView}>
        <View style={ComponentStyle.bottom_sheet_modal}>
          <Image
              resizeMode={'contain'}
              style={styles.alertImage}
              source={images.noInternet}
            />
          
          <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton2]} tx={'no_internet_title'}/>          
           <GdText style={[ComponentStyle.text_h2, styles.cancel]} tx={'no_internet_title'}/>
          <Button heading={'try_again'} onPress={async () => {
                setVisible(false);
                onClick();
          }} exStyle={styles.button} isDisabled={false} />
          <TouchableOpacity hitSlop={10} onPress={() => {setVisible(false);}}>            
            <GdText style={[ComponentStyle.text_h2, styles.cancel]} tx={'cancel'}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default AppNoInternetSheet
 
const styles = StyleSheet.create({
  mainView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: Colors.fonApp
  },
  alertImage: {
    width: dW(278),
    height: dH(100),
    marginVertical: dH(16)
  },
  button: {
    marginVertical: dH(16)
  },
  cancel: {
    marginBottom: dH(16)
  }
});
