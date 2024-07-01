import { StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    selectedBox: {
        backgroundColor: Colors.white
    },
    txtSelected: {
        color: Colors.fonApp,
        opacity: 1,
    },
    diabledBox: {
        backgroundColor: Colors.transparent,
        borderWidth: 2,
        borderColor: Colors.lightblack,
        opacity: 0.4
    },
    listView: {
        marginHorizontal: dW(16)
    },
    txtIronType: {
        fontFamily: fonts.light,
        fontSize: dW(32),
        color: Colors.white,
        fontWeight: "300",
        textAlign: 'center'
    },
    txtIronSubTitle: {
        fontFamily: fonts.regular,
        fontSize: dW(16),
        color: Colors.white,
        fontWeight: "400",
        textAlign: 'center'
       
    },
    txtTitleMargin: {
        marginHorizontal: dW(8),
        marginVertical: dW(24)        
    },
    txtTitleMarginSubTitle: {        
        marginHorizontal: dW(8),
        marginVertical: dW(0)
    },
    listBoxRootSelected:{
        flex: 1,        
        borderWidth:1,
        backgroundColor: Colors.ligth_green,
        opacity :1,
        borderRadius: dW(16),
        marginBottom: dW(8),
        justifyContent: 'center',
        height: dW(84)
    },
    listBoxRoot: {
        flex: 1,
        borderWidth: dW(1),
        borderColor:Colors.inputBorderColor,
        backgroundColor: Colors.textArea_BG,
        opacity :1,
        borderRadius: dW(16),
        marginBottom: dW(8),
        justifyContent: 'center',
        height: dW(84),
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})