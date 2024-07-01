import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'

import fonts from '../../assets/fonts'
import { Constants } from '../constants'
import { dW } from '../dynamicHeightWidth'
import Colors from './colors'
import Responsive from './responsive'

export const CommonStyles = StyleSheet.create({
  flex: {
    flex: 1
  },
  flex2:{
    flex:1/2
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row'
  },
  onboardTitle: {
    marginTop: Constants.onbaordTopMargin,
    alignItems:'center',
    marginHorizontal:dW(30),
    marginBottom: dW(40)
  },
  flexColumn: {
    flexDirection: 'column',
    paddingStart: Responsive.widthPercentageToDP(45)
  },
  bottomSheetContainer: {
    borderRadius:0,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: Colors.update_sheet_BG 
  },
  bottomSheetIcon: {
    backgroundColor: Colors.white,
    height: 3,
    width: 40
  },
  bottomSheetWrapper:{
    backgroundColor: Colors.sheetBg
  }
})

export const Indicator = styled.ActivityIndicator`
  z-index: 2;
  border-radius: 10;
  align-items: center;
  justify-content: center;
  padding: 26px;
  background-color: ${Colors.midGrey};
`

export const LoaderView = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${Colors.modalOverlayLight};
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`
export const ErrorText = styled.Text`
  font-family: ${fonts.medium};
  font-size: ${Responsive.convertFontScale(12)}px;
  color: ${Colors.red};
`
