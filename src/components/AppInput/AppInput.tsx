import React from 'react'
import { useTranslation} from "react-i18next";
import { StyleSheet, TextInput } from 'react-native'
import { TFunction} from "i18next";

import { Constants } from '../../utils/constants'
import { Colors } from '../../utils/theme'


const AppInput = (props: any) => {
  const {
    value,
    onChangeText,
    ref = null,
    style,
    placeholder,
    keyboardType,
    editable = true,
    returnKeyType = "default",
    autoFocus,
    autoCorrect,
    blurOnSubmit,
    ...rest
  } = props

  const { t }: {t: TFunction} = useTranslation()
  return (
    <TextInput
      keyboardAppearance={Constants.keyboardAppearance}
      selectionColor={Constants.textSelectionColor}
      {...rest}
      ref={ref}
      style={[styles.input, style, editable !== true && { color: Colors.gray }]}
      onChangeText={onChangeText}
      value={value}
      placeholder={t(placeholder)}
      keyboardType={keyboardType}
      editable={editable}
      autoFocus={autoFocus}
      autoCorrect={autoCorrect}
      blurOnSubmit={blurOnSubmit}
      returnKeyType={returnKeyType}

    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48
  }
})

export default AppInput
