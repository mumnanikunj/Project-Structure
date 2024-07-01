import React from 'react';
import { Text, View } from 'react-native';

import { SvgImage } from '../../assets/svg/SvgPath';
import Strings from '../../constants/Strings';
import { actualDeviceSize } from '../../utils/dynamicHeightWidth';
import { styles } from './styles';
import { GdText } from '../text/gd-text';

const MASK_WIDTH = actualDeviceSize.width * 0.90
const MASK_HEIGHT = actualDeviceSize.height * 0.8

export const CameraMask = ({ topMargin, target_distance }: {
    topMargin: number,
    target_distance: number
}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.finder, { width: MASK_WIDTH, height: MASK_HEIGHT }]}
            >
                <View style={styles.topCorder}>
                    <SvgImage.cornerTopLeft />
                    <SvgImage.cornerTopRight />
                </View>
                <View style={styles.flex1} />
                <View style={[styles.topCorder, styles.bottomCornerRoot]}>
                    <SvgImage.cornerBottomLeft />
                    <SvgImage.cornerBottomRight />
                </View>
            </View>

            <View style={styles.maskOuter}>
                <View style={[styles.maskRow, styles.maskStyleDefault, styles.maskTop]}>
                </View>
                <View style={[{ height: MASK_HEIGHT }, styles.maskCenter, {
                }]} >
                    <View style={styles.maskStyleDefault} />
                    <View style={[styles.maskInner, { width: MASK_WIDTH, height: MASK_HEIGHT }, styles.maskInner1]} />
                    <View style={styles.maskStyleDefault} />
                </View>
                <View style={[styles.maskRow, styles.maskStyleDefault]} />
            </View>

            <View style={{
                ...styles.header,
                paddingTop: topMargin
            }}>
                <View style={styles.titleRoot}>

                    <View style={styles.distanceRoot}>                        
                        <GdText style={styles.txtTargetDistance} tx={'targetDistance'}/>
                        <Text style={styles.txtTargetValue}>{Strings.value_yards.replace("$1", target_distance)}</Text>                        
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CameraMask;