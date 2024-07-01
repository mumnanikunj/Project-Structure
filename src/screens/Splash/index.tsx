import React, {useEffect} from 'react'
import {Image, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import images from '../../assets/images'
import ScreenNavigation from '../../constants/ScreenNavigation'
import styles from './style'

const Splash = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ScreenNavigation.screens.Login)
    }, 3000)
  })

  return (
    <View styles={styles.container}>
      <Image style={styles.splashImage} source={images.auth.splash} />
    </View>
  )
}

export default Splash
