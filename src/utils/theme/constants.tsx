import {Dimensions, Platform} from 'react-native'

import Strings from '../../constants/Strings'

export const commonConstant = {
  appName: 'GolfDaddy',
  scrWidth: Dimensions.get('screen').width,
  scrHeight: Dimensions.get('screen').height,
  appUser: {},
  isLogin: false,
  tokenData: {} as any,
  activeOpacity: 0.7,
  websiteURL: 'https://golfdaddy.com/',
  errorMessage: Strings.error_alert_message,
  callBack: () => {}
}

export const asyncStorageKeys = {
  userToken: 'userToken',
  userData: 'userData',
  deviceToken: 'deviceToken'
}

export const eventListenerKeys = {
  loginListener: 'loginListener',
  Logout: 'Logout',
  updateProfile: 'updateProfile',
  updateToken: 'updateToken',
  notifyRefresh:'notifyRefresh'
}

const subscriptionSkus = Platform.select({
  ios: ['yearly', 'monthly'],
  android: ['yearly', 'monthly'],
  default: ['yearly', 'monthly']
}) ;

export default {
  commonConstant,
  asyncStorageKeys,
  eventListenerKeys,
  subscriptionSkus
}
