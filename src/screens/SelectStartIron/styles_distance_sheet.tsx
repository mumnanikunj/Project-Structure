import { StyleSheet } from "react-native";

import fonts from "../../assets/fonts";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";

export const styles = StyleSheet.create({
    rootInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dW(48)
    },
    imgClose: {
        marginTop: dH(10)
    },
    rootSheet: {
        borderTopStartRadius: 19,
        borderTopEndRadius: 19,
        backgroundColor: Colors.lightblack 
    },
    root: {
        flex: 1,
        marginHorizontal: dH(24)
    },
    txtTitle: {
        marginTop: dH(54),
        marginBottom: dH(32),
        fontFamily: fonts.bold,
        fontSize: dW(24),
        color: Colors.white
    },
    txtCancel: {
        marginTop: dH(24),
        marginBottom: dH(10),
        fontFamily: fonts.regular,
        fontSize: dW(16),
        color: Colors.white
    },
    viewAddYds: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 10,
        textAlign: 'center',
        fontSize: dW(32),
        color: Colors.white,
        fontFamily: fonts.light
    },
    txtYds: {
        fontSize: dW(32),
        color: Colors.green_light,
        fontFamily: fonts.light
    }
})
