/* eslint-disable no-case-declarations */
import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import _ from 'lodash'

import Strings from '../../constants/Strings'
import {navigate} from '../../utils/RootNavigation'
import {Colors} from '../../utils/theme'
import {IDetailSessionListView} from './DetailSession.props'
import {styles} from './styles'
import { GdText } from '../../components/text/gd-text'

export const DetailSessionListView = (props: IDetailSessionListView) => {
  const getResultValue = (item, key) => {
    switch (key) {
      case 1:
        return `${_.round(_.get(item, 'flight_attributes.carry_distance', 0))} yd`
      case 2:
        return `${_.round(
          _.get(item, 'flight_attributes.total_distance_diff', 0) +
            _.get(item, 'flight_attributes.carry_distance', 0)
        )} yd`
      case 3:
        const deviationResult =
          _.get(item, 'flight_attributes.carry_deviation', 0) +
          _.get(item, 'flight_attributes.total_deviation_diff', 0)
        return `${_.round(Math.abs(deviationResult))}${deviationResult < 0 ? 'L' : 'R'}`
      default:
        break
    }
  }

  const openShotPreview = (data: any): void => {
    
    // navigate('ShotPreview', {Data: data})
  }

  const renderItems = ({item, index}: any) => {
    console.log('item ', item)
    return (
      <TouchableOpacity
        onPress={() => openShotPreview(item)}
        style={[
          styles.DataCon,
          {
            backgroundColor: index % 2 !== 0 ? Colors.darkGreen : Colors.transparent
          }
        ]}
      >
        <View style={styles.DataFlatConIn}>
          <Text style={styles.TimeText}>{'#' + (index + 1)}</Text>
        </View>
        <View style={{...styles.DataFlatConIn}}>
          <Text style={styles.YearText}>{getResultValue(item, 1)}</Text>
        </View>
        <View style={styles.DataFlatConIn}>
          <Text style={{...styles.YearText}}>{getResultValue(item, 2)}</Text>
        </View>
        <View style={styles.DataFlatConIn}>
          <Text style={{...styles.YearText}}>{getResultValue(item, 3)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.NameView}>
      <Text style={styles.SwingsText}>{Strings.YourSwings}</Text>
      <GdText style={styles.SwingsText} tx={'YourSwings'}/>
      <View style={styles.tileCon}>
        <View style={styles.DataFlatConIn}>
          <GdText style={styles.DataText} tx={'Swings'}/>          
        </View>
        <View style={styles.DataFlatConIn}>
          <GdText style={styles.DataText} tx={'Carry'}/>          
        </View>
        <View style={styles.DataFlatConIn}>
          <GdText style={styles.DataText} tx={'Distance'}/>          
        </View>
        <View style={styles.DataFlatConIn}>
          <GdText style={styles.DataText} tx={'Deviation'}/>          
        </View>
      </View>

      <FlatList
        data={props.data}
        renderItem={renderItems}
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={() => props.onEndReach}
        contentContainerStyle={styles.bottom}
      />
    </View>
  )
}
