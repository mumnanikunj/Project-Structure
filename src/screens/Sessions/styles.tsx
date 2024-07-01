import { Platform, StyleSheet } from "react-native"

import fonts from "../../assets/fonts"
import { dH, dW } from "../../utils/dynamicHeightWidth"
import { Colors } from "../../utils/theme"

export const styles = StyleSheet.create({
    TotalSessionnCon: {
        backgroundColor: Colors.lightblack,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: dW(16),
        paddingHorizontal: dW(16),
        paddingVertical: dH(12),
        borderRadius: dH(16),
        height: dH(65),
        marginTop: dH(8)
    },
    TotalSessionnCons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: dW(16),
        borderRadius: dH(16),
        marginTop: dH(16),
        marginBottom: dH(6)
    },
    TotalSessionsText: {
        color: Colors.white,
        fontSize: dW(18),
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    TotalNumberText: {
        color: Colors.green,
        fontSize: dW(32),
        flex: 1,
        textAlign: 'right',
        paddingRight: dW(16),
        fontFamily: fonts.regular,
        fontWeight: '300'
    },
    DataCon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: dH(20),
        backgroundColor: Colors.lightblack,
        paddingVertical: dH(10),
        paddingHorizontal: dW(16)
    },
    DataText: {
        color: Colors.green_light,
        fontSize: 14,
        flex: 1,
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    DataFlatCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: dW(16),
        paddingVertical: dH(10)
    },
    DataFlatConIn: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    YearText: {
        color: Colors.white,
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    TimeText: {
        color: Colors.gray,
        marginTop: dH(3),
        fontFamily: fonts.regular,
        fontSize: 14,
        fontWeight: '400'
    },
    BlueDotImage: {
        marginTop: dH(3)
    },
    PinkDotImage: {
        marginTop: dH(-2)
    },
    ViewRange: {
        marginLeft: dW(5)
    },
    SelectDropDown: {
        flex: 0.48,
        height: dH(48),
        backgroundColor: Colors.transparent,
        borderRadius: dW(10),
        borderColor: Colors.lightblack,
        borderWidth: dW(1.5)
    },
    DropDownbuttonText: {
        fontSize: dH(15),
        color: Colors.white,
        textAlign: 'left',
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    DotMainView: {
        flexDirection: 'row'
    },
    AddNewSessionsImage: {
        height: dH(40),
        width: dW(40)
    },
    SafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
    },
    dropDownStyle: {
        marginTop: Platform.OS === 'android' ? -18 : 0,
        borderRadius: dW(10)
    }

})