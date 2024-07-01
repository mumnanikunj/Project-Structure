import { StyleSheet } from "react-native";

import fonts from "../../assets/fonts";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";

const MASK_TOP_MARGIN = dW(100)

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    flex1: {
        flex: 1
    },
    finder: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: MASK_TOP_MARGIN
    },
    topCorder: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomCornerRoot: {
        marginTop: dW(15)
    },
    maskOuter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    maskRow: {
        width: '100%',
    },
    maskTop: {
        paddingTop: MASK_TOP_MARGIN,
    },
    maskCenter: {
        display: 'flex',
        flexDirection: 'row',
    },
    maskInner1: {
        borderRadius: dW(15),
        overflow: 'hidden'
    },
    maskInner: {
        backgroundColor: Colors.transparent,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    titleRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
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
        color: Colors.white
    },
    txtTargetValue: {
        fontSize: 32,
        fontFamily: fonts.regular,
        fontWeight: "400",
        color: Colors.green
    },
    maskStyleDefault: {
        backgroundColor: Colors.black,
        opacity: 0.6,
        flex: 1
    }
});