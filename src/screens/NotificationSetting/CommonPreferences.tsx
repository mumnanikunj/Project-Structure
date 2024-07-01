/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState }  from 'react'
import { StyleSheet,TouchableOpacity, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import fonts from '../../assets/fonts'
import { GdText } from '../../components/text/gd-text'
import { languageDetectorPlugin } from '../../i18n/languageDetectorPlugin'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { navigationRef } from '../../utils/RootNavigation'
import { Colors } from '../../utils/theme'



interface ICommonPreferences {
  mockData: any
  onSelectItem: (id: number) => void
}

interface ICommonPreferenceData {
  Name: string
  id: number
  is_Selected: boolean
}


const CommonPreferences = (props: ICommonPreferences) => {

  const navigation = useNavigation()
  const SelectionPreferences = () => {
    return props.mockData.map((element: ICommonPreferenceData, index: number) => {
      return (
        <TouchableOpacity key={element.id} onPress={() =>{ props.onSelectItem(element.id)
          navigation.goBack()
        }}>
          <View style={[
            styles.Optionviewstyle,
            {
              backgroundColor: element.is_Selected ? Colors.ligth_green : Colors.textArea_BG,
              borderColor: element.is_Selected  ? Colors.ligth_green : Colors.inputBorderColor,
              borderWidth: 1
            }
          ]}
          >
            <GdText style={[
              styles.Optiontextstyle,
              { color: element.is_Selected  ? Colors.ligth_black : Colors.white }
            ]} tx={element.Name} />
          </View>
        </TouchableOpacity>
      );
    })
  }
  return (
    <View style={styles.rootView}>
      {SelectionPreferences()}
    </View>
  )
}

export default CommonPreferences

const styles = StyleSheet.create({
  rootView: {
    marginHorizontal: dW(16)
  },
  Optionviewstyle: {
    paddingStart: dW(20),
    paddingVertical: dW(14),
    borderRadius: dH(100),
    flexDirection: "row",
    marginBottom: dW(16),
    alignItems: "center"
  },
  Optiontextstyle: {
    fontFamily: fonts.bold,
    fontWeight: '500',
    lineHeight: dW(20),
    fontSize: dW(14),
    flex: 1,
    marginEnd: dW(10)
  },
  Listingroot: {
    marginHorizontal: dW(16), marginVertical: dW(41)
  }

})