import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Portal } from '@gorhom/portal'

import fonts from '../../assets/fonts'
import { languages } from '../../constants/Strings'
import { LANGUAGE_TYPE } from '../../i18n/i18n'
import { languageDetectorPlugin } from '../../i18n/languageDetectorPlugin'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { CommonStyles } from '../../utils/theme/commonStyle'

interface ILocalSheet {
  bottomSheetRef: any
  setLanguage: (language: string) => void
  selectedLanguage: string
}

const LanguageSheet = (props: ILocalSheet) => {

  const OnSelectLanguage = (languageCode: LANGUAGE_TYPE): void => {
    props.setLanguage(languageCode)
    languageDetectorPlugin.cacheUserLanguage(languageCode)
    props.bottomSheetRef.current.close()
  }
  const renderListItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity onPress={() => OnSelectLanguage(item.languagecode)}>
        <View style={[
          styles.Optionviewstyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: item.languagecode === props.selectedLanguage ? Colors.ligth_green : Colors.textArea_BG,
            borderColor: item.languagecode === props.selectedLanguage ? Colors.ligth_green : Colors.inputBorderColor,
            borderWidth: 1
          }
        ]}
        >
          <Text style={[
            styles.Optiontextstyle,
            { color: item.languagecode === props.selectedLanguage ? Colors.ligth_black : Colors.white }
          ]} key={index} >
            {item.Name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (<Portal>
    <RBSheet
      height={dH(199)}
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
      <FlatList
        data={languages}
        renderItem={renderListItem}
        style={styles.Listingroot}
        showsVerticalScrollIndicator={false}
      />
    </RBSheet>
  </Portal>)
}

export default LanguageSheet

const styles = StyleSheet.create({
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