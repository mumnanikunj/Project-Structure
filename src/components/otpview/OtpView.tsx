import React from "react";
import { StyleSheet } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import fonts from "../../assets/fonts";
import { dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";

export const OtpView = ({onOtp} : {onOtp: (otpCode: string) => void}) => {
    return(
        <OTPInputView
        style={styles.root}
        pinCount={4}
        autoFocusOnLoad
        keyboardAppearance={"dark"}       
        keyboardType={"number-pad"}
        selectionColor={'white'}
        codeInputFieldStyle={styles.codeInputFieldStyle}
        codeInputHighlightStyle={styles.codeInputHighlightStyle}
        onCodeFilled={onOtp}        
      />
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%' 
    },
    codeInputFieldStyle: {
        width: dW(62),
        height: dW(70),
        borderRadius: dW(8),
        backgroundColor: Colors.textArea_BG,
        color: Colors.white,
        fontSize: dW(32),
        fontFamily: fonts.light,
        fontWeight: "300",
        borderWidth:dW(1),
        borderColor:Colors.inputBorderColor
    },
    codeInputHighlightStyle: {
        borderColor: Colors.green,
        borderWidth: dW(1),
        color:Colors.white
    }
})