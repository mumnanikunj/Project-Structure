import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

import images from '../../assets/images'
import BuySimulatorSheet from '../../components/BuySimulatorSheet'
import { setCurrentStep } from '../../store/actions/SessionActions'
import { dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { IPlayerLevel } from './profile-setup.type'
import { styles } from './style'

interface IOnboardingOptionListProps {
  // data: []
  data: any,
  setOptionValue: any,
  stage_id: number
}

interface IRenderListProps {
  item: any
  index: number
}


const OnboardingOptionList = (props: IOnboardingOptionListProps) => {
  const [selectitem, setSelectItem] = useState()  
  const [data, setData] = useState();
  const bottomSheetRef = useRef<RBSheet>()
  const dispatch = useDispatch();
  

  const sessionDetail = useSelector((state: any) => state.SessionReducer);
  const { onboardData } = sessionDetail
    const onboardingFlowArray = onboardData.onboarding_flow
  // useSelector((state: any) => state.SessionReducer.onboardData);

  // useSelector((state: any) => state.SessionReducer.onboardData);
  // console.log('onboardData',onboardData)

  const stageView = onboardData.onboarding_flow.find((item: any) => item.stage_id === props.stage_id);
  const OptionSelect = (item: any, index: any) => {
    if (Object.keys(item)[0] === "I don't own a mat") {
      bottomSheetRef.current?.open()
    }

    const dataArray = stageView.options
    for (const key in dataArray) {
      if (key === Object.keys(item)[0]) {
        dataArray[key] = true;
      } else {
        dataArray[key] = false;
      }
    }

    setSelectItem(index)
    const request: IPlayerLevel = {
      answered: true,
      stage_id: stageView.stage_id,
      options: dataArray
    }
    props.setOptionValue(request)
    // dispatch(setCurrentStep(sessionDetail.currentStep + 1))
  }

  const renderListItem = ({ item, index }: IRenderListProps) => {
    return (
      <TouchableOpacity onPress={() => OptionSelect(item, index)}>
        <View style={[
          styles.Optionviewstyle,
          // eslint-disable-next-line react-native/no-inline-styles
          { backgroundColor: selectitem === index ? Colors.ligth_green : Colors.textArea_BG,
            borderWidth: selectitem === index ? 1 : 1,
            borderColor: selectitem === index ? Colors.ligth_green :Colors.inputBorderColor             
          }
        ]}
        >
          <Text style={[
            styles.Optiontextstyle,
            { color: selectitem === index ? Colors.ligth_black : Colors.white }
          ]} key={index} >
            {Object.keys(item)}
          </Text>
          {
            selectitem === index && <Image
            resizeMode={'contain'}
              source={images.rigth_mark}
              style={styles.imgTick}
            />
          }
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <>
      <FlatList data={
        Object.keys(stageView.options).map(key => ({ [key]: stageView.options[key] }))}
        renderItem={renderListItem}
        style={{ width: dW(343), height: dW(330) }}
        showsVerticalScrollIndicator={false}
      />
      <BuySimulatorSheet
        amazon_url={onboardData.amazon_url}
        website_url={onboardData.website_url}
        makuake_url={onboardData.makuake_url}
        data={data} bottomSheetRef={bottomSheetRef}
        onSelectOptions={(data) => {
          // if (data.data === 3) {
          //   navigation.navigate(ScreenNavigation.screens.play, { data: data })
          // }
        }}
      />
    </>
  )
}


export default OnboardingOptionList


