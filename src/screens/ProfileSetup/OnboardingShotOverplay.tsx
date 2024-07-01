import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import images from '../../assets/images'
import { actualDeviceSize, dH } from '../../utils/dynamicHeightWidth'

const OnboardingShotOverplay = () => {
  return (
    <View style={styles.rootStyle}>
      <Image
        resizeMode={'contain'}
        source={images.shot_frame}
        style={styles.imageSize}
      />
    </View>
  )
}

export default OnboardingShotOverplay

const styles = StyleSheet.create({
  rootStyle: {
    alignItems: "center",
    width: '100%',
    height: '100%'
  },
  imageSize: {
    width: actualDeviceSize.width * 0.65,
    height: actualDeviceSize.height * 0.55
  }
})