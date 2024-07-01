import { Platform } from "react-native";

import { dW } from "./dynamicHeightWidth";

export const Constants = {
    APP_STORE: "https://apps.apple.com/us/app/whatsapp-messenger/id6463652126",
    GOOGLE_STORE: "https://play.google.com/store/apps/details?id=com.golfdaddy",
    IS_ANDROID: Platform.OS === 'android',
    onbaordTopMargin:  dW(114),
    APP_VIDEO : 'https://golf-daddy-media.s3.us-west-2.amazonaws.com/App+Explained+2.mp4',
    keyboardAppearance : 'dark',
    textSelectionColor:'white',
    buttonBottomMargin: dW(20),
    bottonOpacity: 0.6
}