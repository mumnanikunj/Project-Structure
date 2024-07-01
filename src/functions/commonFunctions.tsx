import { Alert } from 'react-native'
import Toast from 'react-native-simple-toast';
import Intercom from '@intercom/intercom-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

import config from '../config';
import ScreenNavigation from '../constants/ScreenNavigation'
import EndPoints from '../utils/api/endpoints'
import * as RootNavigation from '../utils/RootNavigation'
import constants, {commonConstant} from '../utils/theme/constants'


export const setAsyncData = async (keyName: string, data: string) => {
  await AsyncStorage.setItem(keyName, data)
}

export const getAsyncData = async (keyName: string) => {
  const data = await AsyncStorage.getItem(keyName);
  return data !== null ? data : '';
}

export const removeAsyncData = async (keyName: string) => {
  await AsyncStorage.removeItem(keyName)
}

export const checkInternetConnection = async () => {
  const data = await NetInfo.fetch()
  if (data.isConnected) {
    return data.isConnected
  } else {
    return false
  }
}

export const debugLog = (message: any, params: any = '') => {
  // eslint-disable-next-line no-console
  console.log(message, params)
}

export const Logout = async () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const { tokenData }: any = commonConstant
  if (tokenData?.access) {
      headers.Authorization = 'Bearer ' + tokenData?.access;
  }
  const res = await fetch(config.baseURL+EndPoints.logout, {
    method: 'GET',
    headers
  });
  debugLog(res)
  await removeAsyncData(constants.asyncStorageKeys.userData)
  await removeAsyncData(constants.asyncStorageKeys.userToken);
  commonConstant.tokenData = {};
  commonConstant.appUser = {}
  commonConstant.isLogin = false
  Intercom.logout();
  RootNavigation.dispatchNavigation(ScreenNavigation.stack.AuthStack);     
};

export const showToast = (message: string) => {
  if(message && message !== null && message !== '') {
    setTimeout(() => {
      Toast.show(message, Toast.LONG);
    }, 500);
  }
};

export function showAlert(message: string) {
  if(message && message !== null && message !== '') {
    setTimeout(() => {
      Alert.alert("GolfDaddy", message, [{text: "Ok"}])
    }, 500)
  }
}