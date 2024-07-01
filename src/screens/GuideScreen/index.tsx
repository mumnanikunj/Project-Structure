import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Video from 'react-native-video'
import { BlurView } from '@react-native-community/blur'
import { useNavigation } from '@react-navigation/native'

import { SvgImage } from '../../assets/svg/SvgPath'
import Button from '../../components/Button'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { Constants } from '../../utils/constants'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { navigate } from '../../utils/RootNavigation'
import { styles } from './styles'

const GuideScreen = () => {
    const [play, setPlay] = useState(true)
    const videoPlayerRef = useRef()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.addListener('focus', () => {
            setPlay(false)
        });

        return () => {
            setPlay(true)
        };
    }, [navigation]);


    return (
        <View style={styles.safeArea}>
            <View style={styles.play_icon_View}>
                <Video
                    ref={videoPlayerRef}
                    style={styles.video}
                    resizeMode={'cover'}
                    source={{ uri: Constants.APP_VIDEO }}
                    repeat={false}
                    paused={play}
                    controls
                />
            </View>
            <TouchableOpacity style={[styles.backPress, { paddingTop: insets.top }]}
                onPress={() => navigation.goBack()}  >
                <BlurView blurType={'ultraThinMaterialDark'} blurAmount={100} style={styles.blur_icon} >
                    <SvgImage.back_vector width={12} height={12} color={Colors.white} />
                </BlurView>
            </TouchableOpacity>
            <View style={styles.btnNext}>
                <View style={styles.textContainer}>
                    <GdText style={styles.guideTitle} tx={'second_guide'} />
                    <GdText style={styles.guideSubtitle} tx={'swing_learn_text'} />
                </View>
                <Button
                    heading={'next'}
                    isDisabled={false}
                    exStyle={{ margin: 0, paddingHorizontal: dW(40) }}
                    onPress={() => {
                        setPlay(true);
                        navigate(ScreenNavigation.screens.play)
                    }} />
            </View>
        </View>
    )
}

export default GuideScreen
