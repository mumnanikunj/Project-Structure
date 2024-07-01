/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import FlashMessage, { showMessage } from "react-native-flash-message";
import Swiper from 'react-native-web-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { AppLoader } from '../../components';
import AppGradient from '../../components/AppGradient';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Strings from '../../constants/Strings';
import { debugLog } from '../../functions/commonFunctions';
import { setCurrentStep, updateOnBoardData } from '../../store/actions/SessionActions';
import APICall from '../../utils/api/api';
import EndPoints from '../../utils/api/endpoints';
import { Constants } from '../../utils/constants';
import { dH, dW } from '../../utils/dynamicHeightWidth';
import { CommonStyles } from '../../utils/theme/commonStyle';
import ScrollRuler from '../ShotPreview/ScollRuler';
import ChoosePhoto from './ChoosePhot';
import ContactInformation from './ContactInformation';
import GamePlay, { DEFAULT_GAME_PLAY_LEFT } from './GamePlay';
import OnboardingOptionList from './OnboardingOptionList';
import { IOnboardItem } from './profile-setup.type';
import { styles } from './style'
import { GdText } from '../../components/text/gd-text';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';


const DEFAULT_VALUE_STEP = {
    height: `3'0`,
    score: '60',
    age: '25'
}

function Onboarding() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute()    
    const sessionDetail = useSelector((state: any) => state.SessionReducer);
    const [rollerValue, setRollerValue] = useState();
    const [optionsListValue, setOptionsListValue] = useState()
    const [isLeftPlay, setLeftPlay] = useState(DEFAULT_GAME_PLAY_LEFT);
    const [loading, setLoading] = useState(false)
    const swiperRef = useRef<Swiper>()
    const swipe = Array(13).fill(1)
    const { t }: {t: TFunction} = useTranslation()
    const { onboardData } = sessionDetail
    const onboardingFlowArray = onboardData.onboarding_flow

    
    const stageView = onboardingFlowArray.find((item: any) => item.stage_id === (_.get(route.params, "stage_id", 1)));
    console.log('onboardingFlowArray', stageView)

    useEffect(() => {
        swiperRef?.current?.goTo(sessionDetail.currentStep)
    }, [sessionDetail.currentStep])

    useEffect(() => {
        console.log("sdf...")
        swiperRef?.current?.goTo(_.get(route.params, "stage_id", 1) - 1)
        dispatch(setCurrentStep(_.get(route.params, "stage_id", 1) - 1))
    }, [])
    useEffect(() => {
        if (optionsListValue) {
            saveData(JSON.parse(JSON.stringify(optionsListValue)))
            goToNextStep()
        }
    }, [optionsListValue])

    const saveData = async (requestData: any, isGoNext = false) => {
        console.log('isGoNext')
        debugLog("requestData.. ", requestData)
        const viewIndex = _.findIndex(onboardingFlowArray, (item: IOnboardItem) => {
            return item.stage_id === requestData?.stage_id
        })

        debugLog('ViewId', viewIndex)
        const updateOnbaord = onboardData
        updateOnbaord.onboarding_flow[viewIndex] = {
            ...updateOnbaord.onboarding_flow[viewIndex],
            ...requestData
        }
        const saveRequestData = {
            onboarding_flow: JSON.stringify(updateOnbaord.onboarding_flow)
        }
        console.log("====== ====")
        console.log("Re.2. ", JSON.stringify(updateOnbaord))
        console.log("====== ====")
        // if (requestData?.stage_id === 10) {
        //     setLoading(true)
        //     uploadProfilePic(requestData)
        //     const response = APICall('put', saveRequestData, EndPoints.signUpUpdate, false)
        //     console.log("Respeon.. ", response)
        //     setLoading(false)
        //     onFinishFlow()
        //     return
        // }
        if (requestData?.stage_id === 1) {
            setLoading(true)
        }
        // return
        const response = await APICall('put', saveRequestData, EndPoints.signUpUpdate, false)
        const responseData = response?.data
        if (requestData?.stage_id === 1) {
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

    const saveDataListAndRoller = async (data = {}) => {
        // return
        const payload = onboardingFlowArray[sessionDetail.currentStep]
        payload.answered = true;

        const defaultValue = sessionDetail.currentStep === 2 ?
            DEFAULT_VALUE_STEP.height :
            sessionDetail.currentStep === 3 ? DEFAULT_VALUE_STEP.age :
                sessionDetail.currentStep === 5 ? DEFAULT_VALUE_STEP.score : "";                
        if (sessionDetail.currentStep === 1) {
            payload.options = {
                left: isLeftPlay,
                right: !isLeftPlay

            }
            // saveData(JSON.parse(JSON.stringify(payload)))
            // goToNextStep()
        } else if ([2, 3, 5].includes(sessionDetail.currentStep)) {
            if([5].includes(sessionDetail.currentStep) && data){
                payload.slider = -1
            }else{
                payload.slider = rollerValue?.newStep || defaultValue
            }
        }
        saveData(JSON.parse(JSON.stringify(payload)))
        goToNextStep()
    }

    const goToNextStep = () => {
        // if (sessionDetail.currentStep === 9) {
        //     navigation.navigate(ScreenNavigation.screens.play, {
        //         data: {
        //             stage_id: sessionDetail.currentStep + 1
        //         }
        //     })
        //     return
        // }
        console.log("goToNextStep ", sessionDetail.currentStep)
        dispatch(setCurrentStep(sessionDetail.currentStep + 1))
    }


    // const uploadProfilePic = (requestData: any) => {
    //     const userObject = onboardData.onboarding_flow[0].input_fields
    //     console.log('USerObject===>', onboardData.onboarding_flow)
    //     const body = {
    //         email: userObject.email,
    //         full_name: userObject.full_name,
    //         profile_pic: {
    //             uri:
    //                 Platform.OS === 'android'
    //                     ? decodeURI(requestData.profile_pic?.uri)
    //                     : decodeURI(requestData.profile_pic?.uri.replace('file://', '')),
    //             name: requestData.profile_pic?.name,
    //             type: requestData.profile_pic?.type
    //         }
    //     };

    //     console.log('Body===>', body)
    //     APICall('put', body, EndPoints.signUpUpdate, true).then(async (res: any) => {
    //         setLoading(false)
    //         console.log("Res... ", JSON.stringify(res))
    //         if (res?.data) {
    //             if (res?.statusCode === 200) {

    //             } else if (res?.statusCode === 422) {
    //                 if (res?.data?.message) {
    //                     showAlert(res?.data?.message)
    //                 }
    //                 else if (res?.data?.errors) {
    //                     showAlert(JSON.stringify(res?.data?.errors))
    //                 }
    //             }
    //         }
    //     })

    // }

    // const onFinishFlow = () => {
    //     notificationSetup();
    //     // Intercom.loginUserWithUserAttributes({
    //     //     userId: commonConstant.appUser.id
    //     // });
    //     navigation.dispatch(
    //         CommonActions.reset({
    //             index: 0,
    //             routes: [{ name: ScreenNavigation.stack.HomeNavigator }]
    //         })
    //     );
    // }

    // const notificationSetup = () => {
    //     Permission.getNotificationPermission()
    //     if (Platform.OS === 'ios') {
    //         PushNotificationIOS.setApplicationIconBadgeNumber(0)
    //     }
    //     setupNotification();
    // };

    const goBackButton = (index: number) => {
        dispatch(setCurrentStep(sessionDetail.currentStep - 1))
        swiperRef?.current?.goTo(sessionDetail.currentStep - 1)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppGradient />
            <Header
                isLogo={false}
                heading={'sign_up'}
                // heading={from === "Home"? Strings.profile_setup: Strings.sign_up}
                isBack
                onClick={goBackButton}
            ></Header>
            <View style={styles.viewSafe}>
                <View style={[styles.safeArea, styles.view_header]}>
                    <Swiper
                        // containerStyle={styles.safeArea}
                        ref={swiperRef}
                        from={sessionDetail.currentStep}
                        activeIndex={sessionDetail.currentStep}
                        minDistanceForAction={0.1}
                        controlsEnabled={false}
                        gesturesEnabled={() => false}
                    >
                        {swipe.map((data, index) => {
                            return (
                                <View key={index} style={{ flex: 1 }}>
                                    <View style={[CommonStyles.onboardTitle, { marginTop: [0].includes(index) ? 0 : Constants.onbaordTopMargin }]}>
                                        <Text style={[styles.text_prop, styles.text_title]}>{onboardingFlowArray[index]?.title}</Text>
                                        {/* <GdText style={[styles.text_prop, styles.text_title]} tx={onboardingFlowArray[index]?.title}/> */}
                                        {/* <GdText style={[styles.text_prop, styles.text_subtitle]} tx={onboardingFlowArray[index]?.subtitle}/> */}
                                        <Text style={[styles.text_prop, styles.text_subtitle]}>{onboardingFlowArray[index]?.subtitle}</Text>
                                    </View>

                                    {index === 0 && <ContactInformation onNext={(data: any) => saveData(JSON.parse(JSON.stringify(data)), true)} />}
                                    {index === 1 && <GamePlay onNext={(isLeft: any) => setLeftPlay(isLeft)} />}
                                    <View style={styles.commonView}>
                                        {index === 2 && <ScrollRuler
                                            type={'height'}
                                            placeHolder={DEFAULT_VALUE_STEP.height}
                                            startFeet={3}
                                            startInches={0}
                                            endFeet={7}
                                            endInches={11}
                                            valueUnitTextStyle={styles.txtHeightCm}
                                            onValueSelect={data => { setRollerValue(data) }}
                                        />}
                                        {index === 3 && <ScrollRuler
                                            type={'age'}
                                            placeHolder={"0"}
                                            minValue={0}
                                            maxValue={100}
                                            onValueSelect={data => {
                                                setRollerValue(data)
                                            }}
                                        />}
                                        {index === 4 &&
                                            <OnboardingOptionList
                                                stage_id={5}
                                                data={stageView}
                                                setOptionValue={setOptionsListValue} />
                                        }
                                        {index === 5 &&
                                            <ScrollRuler
                                                type={'score'}
                                                placeHolder={DEFAULT_VALUE_STEP.score}
                                                stage_id={6}
                                                minValue={60}
                                                maxValue={120}
                                                onValueSelect={data => {
                                                    setRollerValue(data)
                                                }}
                                            />
                                        }
                                        {index === 6 && <OnboardingOptionList
                                            stage_id={7}
                                            data={stageView}
                                            setOptionValue={setOptionsListValue} />
                                        }
                                        {index === 7 && <OnboardingOptionList
                                            stage_id={8}
                                            data={stageView}
                                            setOptionValue={setOptionsListValue} />
                                        }
                                        {index === 8 &&
                                            <OnboardingOptionList stage_id={9} data={stageView}
                                                setOptionValue={setOptionsListValue} />
                                        }
                                        {index === 9 &&
                                            <OnboardingOptionList stage_id={10} data={stageView}
                                                setOptionValue={setOptionsListValue} />
                                        }
                                        {index === 10 &&
                                            <OnboardingOptionList stage_id={11} data={stageView}
                                                setOptionValue={setOptionsListValue} />
                                        }
                                        {index === 11 &&
                                            <OnboardingOptionList stage_id={12} data={stageView}
                                                setOptionValue={setOptionsListValue} />
                                        }
                                        {/* {index === 9 && <OnboardingShotOverplay />} */}
                                        {index === 12 && <ChoosePhoto stage_id={13} from={_.get(route.params, "from", "")}                                             
                                            setLoading={setLoading}
                                        />}

                                    </View>
                                    {/* {
                                        [9].includes(sessionDetail.currentStep) ?
                                            <TouchableOpacity style={styles.calibrateview}>
                                                <Text style={styles.calibratetext}>{stageView.sub_button}</Text>
                                                <Text style={styles.calibratetext}>{stageView.sub_button}</Text>
                                            </TouchableOpacity> :
                                            null
                                    } */}
                                </View>
                            )
                        })}
                    </Swiper>

                    {(sessionDetail.currentStep >= 1 &&
                        sessionDetail.currentStep < 12) &&
                        <View style={styles.bottomView}>
                            {
                                [1].includes(sessionDetail.currentStep) ?
                                    null :
                                    <Button
                                        exStyle={[styles.buttonSign, {
                                            opacity: [1, 2, 3, 5].includes(sessionDetail.currentStep) ? 1 : 0,
                                            position: 'absolute', bottom: sessionDetail.currentStep === 13 ? dH(25) : sessionDetail.currentStep === 5 ? dH(30) : 0
                                        }]}
                                        isDisabled={![1, 2, 3, 5].includes(sessionDetail.currentStep)}
                                        heading={sessionDetail.currentStep === 3 ? 'Submit' : 'next'}
                                        onPress={saveDataListAndRoller}
                                    />
                            }
                            {
                                [5].includes(sessionDetail.currentStep) && <TouchableOpacity
                                onPress={() => saveDataListAndRoller(-1)}
                                style={[styles.calibrateview, {
                                    alignSelf: 'center'
                                }]}>                                                                    
                                <Text style={[styles.calibratetext, styles.BottomSubText]}>{t('not_sure')}</Text>
                            </TouchableOpacity>} 
                            
                            {/* <TouchableOpacity
                                disabled={![12].includes(sessionDetail.currentStep)}
                                style={[styles.calibrateview, {
                                    alignSelf: 'center',
                                    opacity: [12].includes(sessionDetail.currentStep) ? 1 : 0,
                                    display: [12].includes(sessionDetail.currentStep) ? 'flex': 'none'
                                }]}>
                                <Text style={styles.calibratetext}>{onboardingFlowArray[9].sub_button}</Text>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity
                                disabled={![3].includes(sessionDetail.currentStep)}
                                style={[styles.calibrateview, {
                                    alignSelf: 'center',
                                    opacity: [3].includes(sessionDetail.currentStep) ? 1 : 0
                                }]}>
                                <Text style={styles.calibratetext}>{Strings.not_sure}</Text>
                            </TouchableOpacity> */}
                        </View>
                    }
                    
                </View>
            </View>

            {loading && <AppLoader />}
        </SafeAreaView>
    )
}

export default Onboarding;