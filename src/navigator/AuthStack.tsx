import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import ScreenNavigation from '../constants/ScreenNavigation'
import Login from '../screens/Login'
import LoginSignUpCode from '../screens/LoginSignUpCode'
import MyProfile from '../screens/MyProfile'
import Privacy from '../screens/Privacy'
import SignupParent from '../screens/ProfileSetup'
import OnboardCamera from '../screens/ProfileSetup/OnboardCamera'
import Onboarding from '../screens/ProfileSetup/Onboarding'
import SignUp from '../screens/SignUp'
import SignUpCode from '../screens/SignUpCode'

const AuthStack = () => {
  const AuthStackNav = createNativeStackNavigator()

  return (
    <AuthStackNav.Navigator
      // initialRouteName={ScreenNavigation.screens.SignUpCode}
    >     
      <AuthStackNav.Screen
        name={ScreenNavigation.screens.Login}
        component={Login}
        options={{headerShown: false}}
      />
       <AuthStackNav.Screen
        options={{headerShown: false}}
        name={ScreenNavigation.stack.Onboarding}
        component={Onboarding}
      />      
      <AuthStackNav.Screen 
        name={ScreenNavigation.screens.OnboardCamera}
        component={OnboardCamera}
      />
      <AuthStackNav.Screen
        name={ScreenNavigation.screens.SignUp}
        component={SignUp}
        options={{headerShown: false}}
      />
      <AuthStackNav.Screen
        name={ScreenNavigation.screens.SignUpCode}
        component={SignUpCode}
        options={{headerShown: false}}
      />
      <AuthStackNav.Screen
        name={ScreenNavigation.screens.LoginSignUpCode}
        component={LoginSignUpCode}
        options={{headerShown: false}}
      />
      <AuthStackNav.Screen
        options={{headerShown: false}}
        name={ScreenNavigation.stack.SignupStack}
        component={SignupParent}
      />

      <AuthStackNav.Screen
        options={{headerShown: false}}
        name={ScreenNavigation.screens.Privacy}
        component={Privacy}
      />

      <AuthStackNav.Screen
        options={{headerShown: false}}
        name={ScreenNavigation.screens.MyProfile}
        component={MyProfile}
      />
    </AuthStackNav.Navigator>
  )
}

export default AuthStack
