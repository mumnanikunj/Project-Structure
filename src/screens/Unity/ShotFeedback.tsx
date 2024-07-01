import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Portal } from "@gorhom/portal";

import fonts from "../../assets/fonts";
import ComponentStyle from "../../components/ComponentStyle";
import { GdText } from "../../components/text/gd-text";
import Strings from "../../constants/Strings";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";
import { CommonStyles } from "../../utils/theme/commonStyle";

interface IShotFeedback {
    bottomSheetRef: any
}

export const ShotFeedback = (props: IShotFeedback) => {
    return (<Portal>
        <RBSheet
            height={dH(450)}
            openDuration={250}
            closeonDrag
            ref={props.bottomSheetRef}
            closeOnDragDown
            closeOnPressMask
            customStyles={{
                container: CommonStyles.bottomSheetContainer,
                wrapper: CommonStyles.bottomSheetWrapper,
                draggableIcon: CommonStyles.bottomSheetIcon
            }}>

            <View style={ComponentStyle.bottom_shett_view}>                
                <GdText style={[ComponentStyle.text_h1, styles.txtTitle]} tx={"feedback"}/>                
                <GdText style={styles.txtShotLanded} tx={"whereShot"}/>
                <>                    
                    <GdText style={styles.txtDistance} tx={"distance"}/>
                </>
            </View>

        </RBSheet>
    </Portal>)
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.fonApp
    },
    txtTitle: {
        marginTop: 30,
        marginBottom: 18
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
        color: Colors.green_light,
        marginBottom: dW(10)
    },
    txtValue: {
        fontFamily: fonts.light,
        fontSize: dW(32),
        color: Colors.green
    },
    valueRoot: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    btnBg: {
        backgroundColor: Colors.lightblack,
        borderRadius: dW(16),
        paddingVertical: dW(12),
        paddingHorizontal: dW(40)
    },
    btnRoot: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    deviationRoot: {
        alignItems: 'center',
        marginTop: 30
    }
})