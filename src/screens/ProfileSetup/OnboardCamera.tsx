import React, { FC, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { SvgImage } from '../../assets/svg/SvgPath'
import AppGradient from '../../components/AppGradient'
import Button from '../../components/Button'
import ScreenNavigation from '../../constants/ScreenNavigation';
import Strings from '../../constants/Strings'
import { actualDeviceSize } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { styles } from './style'

interface OnboardCameraProps {
    navigation: any
}

const OnboardCamera: FC<OnboardCameraProps> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets()

    const [startrecord, setStartRecord] = useState(false);
    // const onboardData = useSelector((state: any) => state.SessionReducer.onboardData);
    // console.log('stageView',onboardData)
    // const stageView = onboardData.onboarding_flow.find((item: any) => item.stage_id === (_.get(route.params, "stage_id", 11)));    

    const VideoRecordStart = () => {
        if (startrecord) {
            setStartRecord(false)
        } else {
            setStartRecord(true)
            setTimeout(() => {
                 navigation.navigate(ScreenNavigation.screens.Camera
                    // , { Data: { type: 'onboard' ,updateData : stageView  } }
                    )
            //     setStartRecord(false)
            //     navigation.dispatch(StackActions.replace("ShotPreview",
            //         { Data: { type: 'onboard', ...stageView } }))

            }, 3000);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppGradient />
            <View style={styles.headerText}>
                <TouchableOpacity 
                    onPress={() =>navigation.goBack()}
                >
                <SvgImage.cross color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.Viewtitle}>
                    {/* <Text style={styles.txtHeaderTitle}>{_.get(stageView, "title", "")}</Text>
                    <Text style={styles.txtHeaderSubTitle}>{_.get(stageView, "subtitle", "")}</Text> */}
                </View>
            </View>
            <View style={[styles.view_header, styles.view_header_secoundry]}>
                <View style={styles.topCorder}>
                    <SvgImage.cornerTopLeft />
                    <SvgImage.cornerTopRight />
                </View>
                <View style={styles.recordView}>
                    <View>
                        <Text style={styles.txtTitle}>{startrecord ? Strings.swing_ready : Strings.ready_set_swing}</Text>
                        <Text style={styles.txtSubTitle}>{startrecord ? Strings.swing_ready_desc : Strings.Recording_text}</Text>
                    </View>
                    <View>
                        {
                            startrecord && <View style={styles.camera_preview_image_view}>
                                <SvgImage.CameraPreviewImage
                                    width={actualDeviceSize.width}
                                    height={actualDeviceSize.height * (insets.top > 0 ? 0.55 : 0.5)} />
                            </View>
                        }
                        {
                            !startrecord &&
                            <Button
                                exStyle={[styles.text_exStyle,styles.text_exStyle_secondry ]}
                                heading={Strings.record}
                                onPress={() => VideoRecordStart()
                                }
                                isDisabled={false} />
                        }
                    </View>
                </View>
                <View style={[styles.topCorder, styles.bottomCornerRoot]}>
                    <SvgImage.cornerBottomLeft />
                    <SvgImage.cornerBottomRight />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OnboardCamera

