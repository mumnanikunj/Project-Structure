import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Portal } from "@gorhom/portal";

import fonts from "../../assets/fonts";
import { SvgImage } from "../../assets/svg/SvgPath";
import ComponentStyle from "../../components/ComponentStyle";
import Strings from "../../constants/Strings";
import { dH } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";
import { CommonStyles } from "../../utils/theme/commonStyle";
import { StartIronSelectView } from "../StartIron/StartIronSelectView";
import { GdText } from "../../components/text/gd-text";

interface IChangeIronUnity {
    data: any[]
    bottomSheetRef: any
    onChangeIron: (data: any) => void
    isOnBoard?: boolean
}
export const ChangeIronUnity = (props: IChangeIronUnity) => {
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
                <GdText style={[ComponentStyle.text_h1, styles.txtTitle]} tx={'select_club'}/>
                <View style={styles.warningRoot}>
                    {props?.isOnBoard ?                        
                        <GdText style={styles.txtLimited} tx={'limitedAccuricy'}/>
                        : <>
                            <SvgImage.warning width={24} height={24} />
                            <GdText style={styles.txtLimited} tx={'limitedAccuricy'}/>
                        </>
                    }
                </View>
                <View style={styles.listRoot}>
                    <StartIronSelectView
                        data={props.data}
                        isShowStart={false}
                        onSelect={props.onChangeIron}
                    />
                </View>
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
    warningRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 21
    },
    listRoot: {
        width: '100%'
    },
    txtLimited: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: fonts.regular,
        marginStart: 8
    }
})