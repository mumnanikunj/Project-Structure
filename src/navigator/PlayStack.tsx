import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ScreenNavigation from '../constants/ScreenNavigation'
import PlayNow from '../screens/PlayNow'
import SelectStartIcron from '../screens/SelectStartIron'

const PlayStack = () => {
  const HomeStackNav = createNativeStackNavigator()
  return (
    <HomeStackNav.Navigator initialRouteName={ScreenNavigation.screens.playNowMain}>
    
      <HomeStackNav.Screen
        name={ScreenNavigation.screens.playNowMain}
        component={PlayNow}
        options={{headerShown: false}}
      />
     
      <HomeStackNav.Screen
        name={ScreenNavigation.screens.SelectStartoIron}
        component={SelectStartIcron}
        options={{headerShown: false}}
      />
            
    </HomeStackNav.Navigator>
  )
}
export default PlayStack;

