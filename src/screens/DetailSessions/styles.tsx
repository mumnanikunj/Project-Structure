import { Platform, StyleSheet } from 'react-native';

import fonts from '../../assets/fonts';
import { dH, dW } from '../../utils/dynamicHeightWidth';
import { Colors } from '../../utils/theme';

export const styles = StyleSheet.create({
    SwingsText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: fonts.regular,
        marginHorizontal: dW(16),
        marginTop: dH(24),
        textAlign: 'center'
    },
    TotalSessionnCon: {
        backgroundColor: Colors.green_light,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: dW(16),
        paddingHorizontal: dW(16),
        paddingVertical: dH(12),
        borderRadius: 16
    },
    TotalSessionnCons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: dW(16),
        paddingVertical: dH(12),
        borderRadius: 16
    },
    TotalSessionsText: {
        color: Colors.white,
        fontSize: 18
    },
    TotalNumberText: {
        color: Colors.green,
        fontSize: 35,
        flex: 1,
        textAlign: 'right',
        paddingRight: 10
    },
    DataCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightblack,
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    tileCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightblack,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16
    },
    DataText: {
        color: Colors.green_light,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: fonts.regular,
        fontWeight: "400"
    },
    DataFlatConIn: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    YearText: {
        color: Colors.white,
        textAlign: 'center'
    },
    TimeText: {
        color: Colors.white,
        marginTop: 3,
        textAlign: 'center'
    },
    checkCon: {
        marginHorizontal: dW(16),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    checkConIn: {
        width: '48%',
        paddingVertical: 10,
        backgroundColor: Colors.lightblack,
        borderRadius: 16,
        paddingLeft: 10,
        marginTop: 10
    },
    typeText: {
        color: Colors.green_light,
        fontSize: 14
    },
    imageText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8
    },
    textTypes: {
        color: Colors.white,
        marginLeft: 8,
        fontSize: 22
    },
    textTypes2: {
        color: Colors.white,
        marginTop: 8,
        fontSize: 22
    },
    YearTimeText: {
        color: Colors.green,
        textAlign: 'center',
        marginTop: 17,
        fontSize: 16,
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    TimeTextHeader: {
        color: Colors.gray,
        textAlign: 'center',
        marginTop: 4,
        fontSize: 14,
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    SafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
    },
    TimeView: {
        marginTop: dH(-15),
        marginBottom: dH(8)
    },
    NameView: {
        flex: 1
    },
    ButtonEx: {
        marginVertical: dH(16),
        width: '60%'
    },
    bottom:{
        paddingBottom: dH(40)
    }
})