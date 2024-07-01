import { StyleSheet } from "react-native";

import fonts from "../../assets/fonts";
import { actualDeviceSize, dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";

export const styles = StyleSheet.create({
    subTitleBuy: {
        marginHorizontal: dW(40)
    },
    ratingViewRoot: {
       marginVertical: dW(32)
    },
    lineImg:{ alignItems: 'center', marginTop: dW(8), marginBottom: dW(12) },
    txtCancel: {
        color: Colors.white,
        fontSize: dW(16),
        fontWeight:'400',
        fontFamily: fonts.regular,
        textAlign: 'center',
        marginBottom: dW(40)
    },
    textInputStyleRoot: {
        width: actualDeviceSize.width - dW(30),
        backgroundColor: Colors.white,
        height: dW(80),
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.lightblack,
        overflow: 'hidden',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: dW(32)
    },
    textInputStyle: {
        color: Colors.gray,
        fontSize: 14,
        fontFamily: fonts.regular,
        fontWeight: "400",
        backgroundColor: Colors.white
    },
    sheetRoot: {
        borderTopRightRadius: 19,
        borderTopLeftRadius: 19,
        borderRadius: 0
    }
})