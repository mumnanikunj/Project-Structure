import * as React from 'react';
import {Text as ReactNativeText} from 'react-native';

import { translate } from '../../i18n/i18n';
import { TextProps } from './gd-text.props';

export function GdText(props: TextProps) {
  const {
    tx,
    txOptions,
    text,
    children,
    flex1,
    style: styleOverride,
    center,
    underline,
    textAlignRtl,
    ...rest
  } = props;

  const i18nText = tx 
  const content = i18nText || text || children;  
  const textStyle = [
    underline && {textDecorationLine: 'underline'},
    center && {textAlign: 'center'},
    flex1 && {flex: 1},
    textAlignRtl && {flex: 1, textAlign: 'left'},
    styleOverride
  ]; 

  return (
    <ReactNativeText {...rest} style={textStyle} allowFontScaling={false}>
      {translate(content)}
    </ReactNativeText>
  );
}
