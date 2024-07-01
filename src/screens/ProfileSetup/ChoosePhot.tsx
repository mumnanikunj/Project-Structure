import React, { FC, useEffect, useState } from 'react'
import { Image, Platform, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { CommonActions, useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import images from '../../assets/images'
import { AppLoader } from '../../components'
import AppNoInternetSheet from '../../components/AppNoInternetSheet';
import Button from '../../components/Button'
import { GdText } from '../../components/text/gd-text';
import ScreenNavigation from '../../constants/ScreenNavigation';
import Strings from '../../constants/Strings'
import { debugLog, showAlert, showToast } from '../../functions/commonFunctions'
import { setupNotification } from '../../notificationConfig';
import APICall from '../../utils/api/api';
import EndPoints from '../../utils/api/endpoints';
import { Permission } from '../../utils/theme';
import { IOnboardItem } from './profile-setup.type';
import { styles } from './style'
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';


interface ChoosePhotoProps {
  stage_id: number,
  from: string
  props: any
  setLoading:any
  loading:any
}

const ChoosePhoto: FC<ChoosePhotoProps> = ({ from, setOptionValue, setLoading}) => {
  const [image, setImage] = useState({})
  // const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const sessionDetail = useSelector((state: any) => state.SessionReducer);
  const navigation = useNavigation()
  const { t }: {t: TFunction} = useTranslation()

  const { onboardData } = sessionDetail
  const onboardingFlowArray = onboardData.onboarding_flow

  const signUp = async () => {    
    const request = {
      stage_id: 13,
      answered: true,
      profile_pic: {
        uri:
          Platform.OS === 'android'
            ? decodeURI(image?.uri)
            : decodeURI(image?.uri.replace('file://', '')),
        name: image?.fileName,
        type: image?.type
      }
    }
    const viewIndex = _.findIndex(onboardingFlowArray, (item: IOnboardItem) => {
      return item.stage_id === request.stage_id
    })
    const updateOnbaord = onboardData
    updateOnbaord.onboarding_flow[viewIndex] = {
      ...updateOnbaord.onboarding_flow[viewIndex],
      ...request
    }
    const saveRequestData = {
      onboarding_flow: updateOnbaord.onboarding_flow
    }    
    setLoading(true)
    uploadProfilePic(request)
    await APICall('put', saveRequestData, EndPoints.signUpUpdate, false)   
    setLoading(false)
    onFinishFlow()
  };

  const uploadProfilePic = (requestData: any) => {
    const userObject = onboardData.onboarding_flow[0].input_fields
    const body = {
      email: userObject.email,
      full_name: userObject.full_name,
      profile_pic: {
        uri:
          Platform.OS === 'android'
            ? decodeURI(requestData.profile_pic?.uri)
            : decodeURI(requestData.profile_pic?.uri.replace('file://', '')),
        name: requestData.profile_pic?.name,
        type: requestData.profile_pic?.type
      }
    };

    APICall('put', body, EndPoints.signUpUpdate, true).then(async (res: any) => {
      setLoading(false)
      if (res?.data) {
        if (res?.statusCode === 200) {

        } else if (res?.statusCode === 422) {
          if (res?.data?.message) {
            showAlert(res?.data?.message)
          }
          else if (res?.data?.errors) {
            showAlert(JSON.stringify(res?.data?.errors))
          }
        }
      }
    })

  }

  const onFinishFlow = () => {
    notificationSetup();    
    // Intercom.loginUserWithUserAttributes({
    //     userId: commonConstant.appUser.id
    // });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNavigation.stack.HomeNavigator }]
      })
    );
  }
  const notificationSetup = () => {
    Permission.getNotificationPermission()
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
    }
    setupNotification();
  };

  const validate = async () => {
    if (image?.uri !== undefined) {
      signUp();
    } else {
      showToast(t('error_choose_photo'))
    }
  };

  return (
    <View style={[styles.marg_hor, styles.choose_photo_view]}>
      <TouchableOpacity
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1
          });
          if (result.assets !== undefined && result.assets?.length > 0 && result.assets[0] !== undefined) {
            debugLog(result.assets[0]);
            setImage(result.assets[0]);
          }
        }}
      >
        {image.uri !== undefined ? (
          <Image style={styles.photo_choose} source={{ uri: image.uri }} />
        ) : (
          <Image style={styles.photo_choose} source={images.auth.dummy_img} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipView}
        onPress={async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1
          });
          if (result.assets !== undefined && result.assets?.length > 0 && result.assets[0] !== undefined) {
            debugLog(result.assets[0]);
            setImage(result.assets[0]);
          }
        }}
      >        
        <GdText style={styles.skipText} tx={'choose_photo'}/>
      </TouchableOpacity>


      <View>
        <View style={styles.btnRoot}>
          <Button
            heading={'Submit'}
            exStyle={styles.nextView}
            onPress={() => {
              validate()
            }}
            isDisabled={false}
          />
          <TouchableOpacity
            style={styles.skipView}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: ScreenNavigation.stack.HomeNavigator }]
                })
              )
            }
          >            
            <GdText style={styles.skipText} tx={'skip'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.emptryGrow}>
        </View>

      </View>      
      <AppNoInternetSheet visible={visible} onClick={signUp} setVisible={setVisible} />
    </View>
  )
}

export default ChoosePhoto
