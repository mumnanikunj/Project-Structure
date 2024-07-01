import { StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    ydsRoot: {
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'row'
    },
    ydsroot1: {
        flexDirection: 'row',
        backgroundColor: Colors.black60,
        borderRadius: 50,
        overflow: 'hidden'
    },
    txtYds:{
        textAlign: 'center',
        fontSize: 16,
        color: Colors.white,
        paddingVertical: dW(12),
        paddingHorizontal: dW(16)
    },
    mapImageFull: {
        flex: 1,
        height: null,
        width: null,
        ...StyleSheet.absoluteFillObject
    },
    listRoot: {
        ...StyleSheet.absoluteFillObject
    },
    iconRootRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: dW(16),
        marginTop: dW(-30)
    },
    mapNameRoot: {
        flex: 1,
        alignItems: 'center'
    },
    txtMapId: {
        fontSize: 16,
        color: Colors.green,
        fontFamily: fonts.regular,
        fontWeight: "400"
    },
    txtMapName: {
        fontSize: 24,
        color: Colors.white,
        fontFamily: fonts.bold,
        fontWeight: "600",
        textAlign: 'center'
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    play_view: {
        flexDirection: 'row',
        borderColor: Colors.lightblack,
        paddingHorizontal: dW(10),
        paddingVertical: dH(8),
        borderRadius: 25,
        borderWidth: 1,
        width: dW(180),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: dH(16),
        alignSelf: 'center'
    },
    how_play: { width: dW(20), height: dW(20) },
    KindGameText: {
        color: Colors.white,
        fontSize: 15,
        fontFamily: fonts.regular,
        fontWeight: '300',
        marginStart: 20
    },
    btnContinue: {
        marginBottom: dH(12),
        marginTop: dH(16)
    },
    cornerImages: {
    }
})