import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import _ from "lodash";

import fonts from "../../assets/fonts";
import TimerComponent from "../../components/SessionTimer/TimerComponent";
import { dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";
import { IArrayofDetailes, IDetailSessionsOverview } from "./DetailSession.props";

export const DetailSessionsOverview = (props: IDetailSessionsOverview) => {
    console.log("props.. ", props)
    return (
        <View style={styles.checkCon}>
            {props.ArrayofDetailes?.map((item: IArrayofDetailes, index: number) => {
                const stylesData = [styles.textTypes, {
                    marginStart: dW(index === 0 ? 0 : 8)
                }]
                return (
                    <View style={styles.checkConIn} key={_.toString(index)}>
                        <Text style={styles.typeText}>{item.text}</Text>
                        {item.img ? (
                            <View style={styles.imageText}>
                                <Image source={item.img} style={styles.icons} />
                                {props.isUnity && item.text === "Duration" && item.times !== "00:00:00" ?
                                    <TimerComponent initialTime={item.times} textStyle={stylesData} />
                                    :
                                    <Text style={ stylesData}>{item.times}</Text>
                                }
                            </View>
                        ) : (
                            <Text style={[styles.textTypes,{
                                marginTop: dW(6)
                            }]}>{item.times}</Text>
                        )}
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    checkCon: {
        marginHorizontal: dW(16),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    checkConIn: {
        width: '48%',
        backgroundColor: Colors.lightblack,
        borderRadius: dW(12),
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 10
    },
    icons: {
        width: dW(24),
        height: dW(24),
        tintColor: Colors.green
    },
    typeText: {
        color: Colors.green_light,
        fontSize: 14,
        fontFamily: fonts.regular,
        fontWeight: "400"
    },
    imageText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8,
    },
    textTypes: {
        color: Colors.white,
        fontSize: 22,
        fontFamily: fonts.light,
        fontWeight: "300"
    }
})