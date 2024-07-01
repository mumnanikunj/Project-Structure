import {Platform} from 'react-native'
import {PERMISSIONS, PermissionStatus, request, requestNotifications} from 'react-native-permissions'
import message from '@react-native-firebase/messaging'

const getPushPermission = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    message().hasPermission().then((status: number) =>{
      if(status === 1) {
        resolve(true)
      } else{
        resolve(false)
      }
    })
  })
}

const requestPushPermission = (): Promise<PermissionStatus> => {
  return new Promise((resolve) => {
    requestNotifications(['alert', 'sound']).then(({status}) => resolve(status))
  })
}


const getCameraPermission = () => {
  return new Promise((resolve) => {
    request(
      Platform.OS === "android" ? PERMISSIONS.ANDROID.CAMERA: PERMISSIONS.IOS.CAMERA
    )
      .then((response: string) => {
        if (response === 'granted') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(() => resolve(false))
  })
}

const getStoragePermission = () => {
  return new Promise((resolve) => {
    if (Platform.OS === 'ios') {
      resolve(true)
      return
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      resolve(true)
      return
    }

    request(
      Platform.OS === "android" ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY
    )
      .then((response: string) => {
        if (response === 'granted') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(() => resolve(false))
  })
}

const getGalleryPermission = () => {
  return new Promise((resolve) => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
        .then((response: string) => {
          if (response === 'granted') {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(() => resolve(false))
    }
    resolve(true)
  })
}

const getNotificationPermission = () => {
  return new Promise((resolve) => {
    requestNotifications(['alert', 'sound']).then((resp) => {})
  })
}

const Permission = {
  getCameraPermission,
  getStoragePermission,
  getGalleryPermission,
  getNotificationPermission,
  getPushPermission,
  requestPushPermission
}

export default Permission
