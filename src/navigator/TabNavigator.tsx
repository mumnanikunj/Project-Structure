/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { useTranslation} from "react-i18next";
import { Image, Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TFunction} from "i18next";

import fonts from '../assets/fonts'
import images from '../assets/images'
import ComponentStyle from '../components/ComponentStyle'
import ScreenNavigation from '../constants/ScreenNavigation'
import Home from '../screens/Home'
import Notifications from '../screens/Notifications'
import Sessions from '../screens/Sessions'
import Settings from '../screens/Settings'
import { actualDeviceSize, dH, dW } from '../utils/dynamicHeightWidth'
import { Colors, Images } from '../utils/theme'
import PlayStack from './PlayStack'

const TAB_ICON = {
  "Home": images.tabs.home,
  "SessionsList": images.tabs.session,
  "Notification": images.tabs.notification,
  "Setting": images.tabs.setting
}
const TabNavigator = () => {
  const Tab = createBottomTabNavigator()
  const insets = useSafeAreaInsets();
  const { t }: {t: TFunction} = useTranslation()
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarBackground: () => (
            <View style={styles.tabRoot}>
              <Image
                resizeMode={"stretch"}
                source={Images.bottomTabBg}
                style={[styles.tabBarBackgroundImage, {
                  marginTop: insets.bottom > 0 ? -(insets.bottom * 0.51) : 0
                }]} />
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            return <Image style={[styles.tabIconImage, { tintColor: color }]}
              source={TAB_ICON[route.name]} />
          },
          tabBarLabelStyle: styles.tabbarLabel,
          tabBarActiveTintColor: Colors.white,
          tabBarIconStyle: styles.tabbarIcon,
          tabBarInactiveTintColor: Colors.green_light,
          headerShown: false,
          tabBarStyle: styles.tabbarStyle
        })
      }>
      <Tab.Screen
        name={ScreenNavigation.screens.Home}
        options={{ tabBarLabel: t('home') }}
        component={Home}
      />
      <Tab.Screen
        name={ScreenNavigation.screens.sessions}
        options={{ tabBarLabel: t('sessions') }}
        component={Sessions}
      />
      <Tab.Screen
        name={ScreenNavigation.screens.playNow}
        component={PlayStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Image
              resizeMode={'contain'}
              style={ComponentStyle.bottom_img}
              source={images.tabs.play}
            />
          )
        }}
      />
      <Tab.Screen
        name={'Notification'}
        options={{ tabBarLabel: t('notifications') }}
        component={Notifications}
      />
      <Tab.Screen
        name={'Setting'}
        options={{ tabBarLabel: t('settings') }}
        component={Settings}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  headerMainComponent: {
    height: dH(40),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dW(16)
  },
  tabRoot: {
    backgroundColor: Colors.black,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  tabbarIcon: {
    // marginTop: dH(6)
  },
  tabbarLabel: {
    fontSize: 11,
    fontFamily: fonts.regular,
    marginBottom: Platform.OS === 'ios' ? 0 : 20
  },
  tabIconImage: {
    resizeMode: 'contain',
    height: dH(24),
    width: dW(24)
  },
  tabbarStyle: {
    backgroundColor: Colors.update_sheet_BG,
    borderTopWidth: dW(0)
  },
  tabBarBackgroundImage: {
    width: actualDeviceSize.width
  }
})
export default TabNavigator
