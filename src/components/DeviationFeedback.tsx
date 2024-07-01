import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RBSheet from "react-native-raw-bottom-sheet";
import { Portal } from "@gorhom/portal";

import fonts from "../assets/fonts";
import Strings from "../constants/Strings";
import ScrollRuler from "../screens/ShotPreview/ScollRuler";
import { dH, dW } from "../utils/dynamicHeightWidth";
import { CommonStyles } from "../utils/theme/commonStyle";
import ComponentStyle from "./ComponentStyle";
import Button from "./Button";
import { GdText } from "./text/gd-text";


export const DeviationFeedback = ({ bottomSheetRef, onSave }: {
    bottomSheetRef: any,
    onSave: (data: any) => void
}) => {

    const [distance, setDistance] = useState('')
    const [deviation, setDeviation] = useState('')

    return (
        <Portal>
            <RBSheet
                height={dH(480)}
                openDuration={250}
                closeonDrag
                ref={bottomSheetRef}
                closeOnDragDown
                closeOnPressMask
                customStyles={{
                    container: CommonStyles.bottomSheetContainer,
                    wrapper: CommonStyles.bottomSheetWrapper,
                    draggableIcon: CommonStyles.bottomSheetIcon
                }}
            >
                <View style={ComponentStyle.bottom_shett_view}>
                    <GdText style={[ComponentStyle.text_h1, styles.txtTitle]} tx={'calibration'} />
                    <GdText style={styles.txtShotLanded} tx={'whereShot'} />
                    <>
                        <GdText style={styles.txtDistance} tx={'carry_distance'} />
                        {/* <View style={{flex:1}}> */}
                        <ScrollRuler
                            type={'distance'}
                            minValue={0}
                            maxValue={200}
                            onValueSelect={(data) => {
                                setDistance(data.newStep)
                            }}
                        />
                        {/* </View> */}
                        <GdText style={styles.txtDistance} tx={'carry_deviation'} />
                        <ScrollRuler
                            type={'deviation'}
                            minValue={20}
                            maxValue={20}
                            onValueSelect={(data) => {
                                setDeviation(data.newStep)
                            }}
                        />
                    </>
                    <Button
                        exStyle={{}}
                        heading={'send'}
                        onPress={() => onSave({
                            distance, deviation
                        })}
                    />
                </View>
            </RBSheet>
        </Portal>
    )
}


const styles = StyleSheet.create({
    txtTitle: {
        marginTop: dH(15),
        marginBottom: dH(15)
    },
    txtShotLanded: {
        fontFamily: fonts.regular,
        fontSize: dW(16),
        color: Colors.white,
        marginBottom: dW(24)
    },
    txtDistance: {
        fontFamily: fonts.regular,
        fontSize: dW(16),
        color: Colors.white,
        marginBottom: dW(10)
    },
    SendText: {
        fontFamily: fonts.bold,
        fontWeight: '500',
        color: Colors.white,
        fontSize: dW(14),
        lineHeight: 20
    },
    bottomButtonText: {
        color: Colors.white,
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 16
    },
    bottomButton: {
        top: dH(15)
    },

    SendView: {
        backgroundColor: Colors.green,
        paddingVertical: 16,
        paddingHorizontal: 80,
        borderRadius: 40
    },
})