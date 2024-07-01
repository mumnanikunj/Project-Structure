/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import _ from "lodash"

import { SvgImage } from "../../assets/svg/SvgPath"
import Button from "../../components/Button"
import Strings from "../../constants/Strings"
import { Colors } from "../../utils/theme"
import { styles } from "./styles"

export interface IIronData {
    club_type: string
    id: number
    is_active: boolean
    subtitle?: string
    title: string
    is_selected?: boolean
    beta: boolean
}

interface IStartIronSelectView {
    data: any[]
    isShowStart?: boolean
    onSelect?: (data: any) => void
}

export const StartIronSelectView = ({ data, isShowStart = true, onSelect }: IStartIronSelectView) => {
    const [startIronData, setIronData] = useState<IIronData[]>(data)
    const [selectItem , setSelectItem] = useState();

    const onSelectItron = (data: IIronData): void => {
        const updatedIron = _.map(startIronData, (item) => {
            return { ...item, is_selected: item.id === data.id }
        })
        setIronData(updatedIron)
        onSelect?.(data)
    }

    return (<View style={style.root}>
        <FlatList
            data={startIronData}
            numColumns={3}
            keyExtractor={(item) => _.toString(item.id)}
            contentContainerStyle={styles.listView}
            renderItem={({ item, index }: { item: IIronData, index: number }) => {
                return <TouchableOpacity
                    disabled={!_.get(item, "is_active", false)}
                    onPress={() => {onSelectItron(item)
                        setSelectItem(index)
                    }}
                    activeOpacity={0.5}
                    style={[
                         selectItem === index ? styles.listBoxRootSelected : styles.listBoxRoot,
                        {
                            marginStart: index % 3 === 0 ? 0 : 8
                        },
                        !item.is_active && styles.diabledBox                        
                    ]}
                        >
                    {item.beta &&  <SvgImage.warning style={style.warningImg} />}
                    <Text style={[styles.txtIronType,
                    item?.subtitle ? styles.txtTitleMarginSubTitle : styles.txtTitleMargin,
                    item?.is_active && {color: Colors.white , opacity:1},
                    selectItem === index ? {color:Colors.fonApp} : {color:Colors.white},
                    !item?.is_active && {color: Colors.gray}                
                    ]}>{item.title}</Text>

                    {_.get(item, "subtitle", false) &&
                        <Text style={[styles.txtIronSubTitle,
                        item?.is_selected && styles.txtSelected,
                        selectItem === index ? {color:Colors.fonApp, opacity: 1} :
                         {color:Colors.white, opacity:0.6},
                         !item?.is_active && {color: Colors.white,  opacity: 0.35}]}
                         >{item.subtitle}</Text>}
                </TouchableOpacity>
            }}
        />
        {isShowStart && <Button
            exStyle={{}}
            heading={Strings.start_session}
            onPress={() => { }}
            isDisabled={false} />}

    </View>)
}

const style = StyleSheet.create({
    root: {
        // flex: 1
        width: '100%'
    },
    warningImg: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
    }
})