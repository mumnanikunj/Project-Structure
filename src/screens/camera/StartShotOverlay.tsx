/* eslint-disable simple-import-sort/imports */
/* eslint-disable react-native/no-color-literals */
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { actualDeviceSize, dH, dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";
import { SvgImage } from "../../assets/svg/SvgPath";
import Strings from "../../constants/Strings";
import fonts from "../../assets/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { GdText } from "../../components/text/gd-text";

const BUTTON_SIZE = 50;

export const StartShotOverlay = ({ target_distance }:
    { target_distance: string }) => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    return <View style={[styles.timer, { paddingTop: insets.top }]}>
        <View style={styles.titleRoot}>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.goBack() }} hitSlop={20}>
                <Image
                    style={{ height: dH(24), width: dW(24) }}
                    source={images.cross}
                    resizeMode={"contain"} />
            </TouchableOpacity>
            <View style={styles.distanceRoot}>
                <Text style={styles.txtTargetDistance}>{Strings.targetDistance}</Text>
                <GdText style={styles.txtTargetDistance} tx={'targetDistance'}/>
                <Text style={styles.txtTargetValue}>{Strings.value_yards.replace("$1", target_distance)}</Text>
            </View>
        </View>
        <View style={styles.topCornerRoot} />
        <View style={styles.topCorder}>
            <SvgImage.cornerTopLeft />
            <SvgImage.cornerTopRight />
        </View>        
        <GdText style={styles.txtTitle} tx={'swing_ready'}/>        
        <GdText style={styles.txtSubTitle} tx={'swing_ready_desc'}/>
        <SvgImage.CameraPreviewImage
            width={actualDeviceSize.width}
            height={actualDeviceSize.height * (insets.top > 0 ? 0.55 : 0.5)} />
        <View style={[styles.topCorder, styles.bottomCornerRoot]}>
            <SvgImage.cornerBottomLeft />
            <SvgImage.cornerBottomRight />
        </View>
    </View>
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 16,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: Colors.camera_btn_back,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    timer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 32,
    },
    txtTitle: {
        fontSize: 24,
        fontFamily: fonts.bold,
        fontWeight: "600",
        color: Colors.white,
        marginTop: dH(8)
    },
    distanceRoot: {
        position: 'absolute',
        width: '100%',
        top: -dH(3),
        alignItems: 'center'
    },
    txtTargetDistance: {
        fontSize: 16,
        fontFamily: fonts.regular,
        fontWeight: "400",
        color: Colors.white,
    },
    txtTargetValue: {
        fontSize: 32,
        fontFamily: fonts.regular,
        fontWeight: "400",
        color: Colors.green,
    },
    txtSubTitle: {
        fontSize: 16,
        fontFamily: fonts.regular,
        fontWeight: "400",
        color: Colors.white,
        marginVertical: dH(16)
    },
    topCorder: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topCornerRoot: {
        marginTop: dW(20)
    },
    bottomCornerRoot: {
        marginTop: dW(15),
    }

})