import React from 'react'
import { withIAPContext } from 'react-native-iap';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ScreenNavigation from '../constants/ScreenNavigation'
import { CameraPage } from '../screens/camera/Camera'
import ConfirmDelete from '../screens/ConfirmDelete';
import DeleteAccount from '../screens/DeleteAccount';
import DetailSessions from '../screens/DetailSessions'
import GuideScreen from '../screens/GuideScreen';
import MyProfile from '../screens/MyProfile';
import NotificationSetting from '../screens/NotificationSetting';
import OnGoingSessions from '../screens/OngoingSession'
import PaymentHistory from '../screens/Payments'
import Play from '../screens/Play'
import PlayScreen from '../screens/PlayScreens'
import OnboardCamera from '../screens/ProfileSetup/OnboardCamera';
import SelectMap from '../screens/SelectMap';
import ShotPreview from '../screens/ShotPreview';
import StartIron from '../screens/StartIron';
import Subscription from '../screens/Subscription';
import TermsPrivacy from '../screens/TermsPrivacy';
import UnityViewScreen from '../screens/Unity/UnityViewScreen'
import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'

interface RootProps {
  isLogged: boolean
};

const Root = ({ isLogged }: RootProps) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={
      isLogged ? ScreenNavigation.stack.HomeNavigator : ScreenNavigation.stack.AuthStack
    }>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ScreenNavigation.stack.HomeNavigator}
        component={TabNavigator}
      />

      <Stack.Screen 
        options={{headerShown:false}}
        name={ScreenNavigation.screens.GuideScreen}
        component={GuideScreen}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.Unity}
        component={UnityViewScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.Camera}
        component={CameraPage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={ScreenNavigation.stack.AuthStack}
        component={AuthStack}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.DetailsSessions}
        component={DetailSessions}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.OngoingSession}
        component={OnGoingSessions}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.ShotPreview}
        component={ShotPreview}
        options={{ headerShown: false, 
            animation: 'fade_from_bottom',
            contentStyle:{
              backgroundColor:'black'
            }
        }}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.play}
        component={Play}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name={ScreenNavigation.screens.OnboardCamera}
        component={OnboardCamera}
        options={{ headerShown: false }}
      />  

      <Stack.Screen
        name={ScreenNavigation.screens.playScreen}
        component={PlayScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={ScreenNavigation.screens.MyProfile}
        component={MyProfile}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.NotificationSetting}
        component={NotificationSetting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNavigation.screens.TermsPrivacy}
        component={TermsPrivacy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNavigation.screens.DeleteAccount}
        component={DeleteAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNavigation.screens.ConfirmDelete}
        component={ConfirmDelete}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNavigation.screens.SelectMap}
        component={SelectMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNavigation.screens.StartIron}
        component={StartIron}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNavigation.screens.PaymentHistory}
        component={withIAPContext(PaymentHistory)}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNavigation.screens.Subscription}
        component={withIAPContext(Subscription)}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}
export default Root
