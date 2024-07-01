import i18n from "i18n-js"
import React from "react"
import { StyleProp, TextProps as TextProperties, TextStyle } from "react-native"

export interface TextProps extends TextProperties {
  children?: React.ReactNode
  tx?: string
  txOptions?: i18n.TranslateOptions
  text?: string
  style?: StyleProp<TextStyle>
  underline?: boolean
  color?: string
  center?: boolean
  flex1?: boolean
  textAlignRtl?: boolean
}
