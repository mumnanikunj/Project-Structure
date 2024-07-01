import React, { FC, useEffect, useState } from 'react'
import { Keyboard, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import { AppLoader } from '../../components'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Strings from '../../constants/Strings'
import { setCurrentStep, updateOnBoardData } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import {  IOnboardItem } from './profile-setup.type'
import { styles } from './style'
import { GdText } from '../../components/text/gd-text'

interface GamePlayProps {
  onNext: any;
}

export const DEFAULT_GAME_PLAY_LEFT = null

const GamePlay: FC<GamePlayProps> = ({ onNext }) => {
  const [isLeft, setLeft] = useState(DEFAULT_GAME_PLAY_LEFT);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const sessionDetail = useSelector((state: any) => state.SessionReducer);
  const dispatch = useDispatch();

  const { onboardData } = sessionDetail
    const onboardingFlowArray = onboardData.onboarding_flow

  useEffect(() => {
    Keyboard.dismiss()
  }, []);

  const signUp = async () =>  onNext(isLeft);

  const saveData = async (requestData: any, isGoNext = false) => {
    const viewIndex = _.findIndex(onboardingFlowArray, (item: IOnboardItem) => {
        return item.stage_id === requestData?.stage_id
    })
    const updateOnbaord = onboardData
    updateOnbaord.onboarding_flow[viewIndex] = {
        ...updateOnbaord.onboarding_flow[viewIndex],
        ...requestData
    }
    const saveRequestData = {
        onboarding_flow: JSON.stringify(updateOnbaord.onboarding_flow)
    }
    if(requestData?.stage_id === 1){
        setLoading(true)
    }
    // return
    const response = await APICall('put', saveRequestData, EndPoints.signUpUpdate, false)
    const responseData = response?.data 
    if(requestData?.stage_id === 1){
        setLoading(false)
    }
    if (responseData) {
        if (responseData?.statusCode === 200) {
            dispatch(updateOnBoardData(updateOnbaord))
            isGoNext && goToNextStep()
        } else if (responseData?.statusCode === 422) {
            showMessage({
                message: responseData?.errors?.username || responseData?.errors?.email,
                type: "danger"
            })
        }
    }
}
const goToNextStep = () => {
  dispatch(setCurrentStep(sessionDetail.currentStep + 1))
}

  const selection_Handed = (value) =>{
    console.log('isLeft',value)
    setLeft(value)
    const payload = onboardingFlowArray[sessionDetail.currentStep]
        payload.answered = true;
        if (sessionDetail.currentStep === 1) {
            payload.options = {
                left: isLeft,
                right: !isLeft
            }
        }
        saveData(JSON.parse(JSON.stringify(payload)))
        goToNextStep()
    
  }
  return (
    <View style={[styles.safeArea,{ width: '100%'}]}>
      <View style={[styles.marg_hor, styles.row]}>
        <View style={styles.safeArea}>
          <TouchableOpacity
            style={(isLeft && isLeft != null) ? styles.selected_hand : styles.unselected_hand}
            onPress={() => selection_Handed(true)}
          >
            <GdText style={[styles.text_game, isLeft ? styles.selected_text_prop : styles.text_prop]} tx={'left'}/>
            <GdText style={[styles.text_h2, isLeft ? styles.selected_text_prop : styles.text_prop]} tx={'handed'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
        <View style={styles.safeArea}>
          <TouchableOpacity
            style={(isLeft || isLeft == null) ? styles.unselected_hand : styles.selected_hand}
            onPress={() => selection_Handed(false)}
          >
            <GdText style={[styles.text_game, isLeft || isLeft == null ? styles.text_prop : styles.selected_text_prop]} tx={'right'}/>
            <GdText style={[styles.text_h2, isLeft || isLeft == null  ? styles.text_prop : styles.selected_text_prop]} tx={'handed'}/>
          </TouchableOpacity>
        </View>
      </View>

      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={signUp} setVisible={setVisible} />
    </View>
  )
}

export default GamePlay
