import {Platform, StyleSheet} from 'react-native'

import fonts from '../../assets/fonts';
import {dH, dW} from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme';
import responsive from '../../utils/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fonApp,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  countryPickerRoot: {
    marginLeft: 16 
  },
  flex1:{
    flex:1
  },
  forgotPasswordText: {
    // color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white
  },
  loginImage: {
    height: dH(54),
    width: dW(103),
    top: dH(0),
    position: 'absolute'
  },
  signinHeading: {
    color: Colors.white,
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '600'
  },
  phoneNumberInput: {
    backgroundColor: Colors.textArea_BG,
    width: '100%',
    borderRadius: 8,
    color: Colors.white,
    marginHorizontal: 16,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400'
  },
  textInputArea: {
    backgroundColor: Colors.textArea_BG,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderColor:Colors.inputBorderColor
  },
  parentContainer: {
    // flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 15,
    marginTop: dH(34)
    // backgroundColor: 'red'
  },
  confirmationText: {
    // color: Colors.white,
    // alignSelf: 'center'
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400'
  },
  flex1:{
    flex: 1
  },
  btnSignUpNext:{
    marginVertical: dH(12)
  },
  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: dH(2)
  },
  signInText: {
    // color: Colors.green,
    // marginLeft: 10
    color: Colors.green,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400'
  },
  flag: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row",
  },
  commonButton: {
    marginTop: dH(64)
  },
  noteText: {
    color: Colors.white,
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center'
  },
  noteBox: {
    width: dW(300),
    alignSelf: 'center',
    marginTop: dH(24)
  },
  checkBoxTwo: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.green,
    alignSelf: 'center'
  },
  checkBoxOne: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray
  },
  parentCheckBoxText: {
    color: Colors.white,
    fontSize: 16,
    width: '90%'
  },
  clickableCheckbox: {
    alignSelf: 'center'
  },
  checkBoxArea: {
    flexDirection: 'row',
    marginEnd:dW(35),
    // marginHorizontal: dW(16),
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    marginTop: dH(32)
  },
  tickBox: {
    height: dH(30),
    width: dW(30),
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:dH(22),
    marginRight: dW(15)
  },
  comboContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 32
  },
  parentCheckBox: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: dW(5)
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: responsive.convertFontScale(14),
    color: Colors.red,
    width:'85%',
    alignSelf: 'center',
    marginVertical: dH(8)
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  downArrow:{
    height:dW(12),
    width:dW(12),
    marginHorizontal: dW(10)
  },
  countrySelect:{
    flexDirection:"row",    
    alignItems:"center",
    marginStart: dW(16)
  },
  countryCodeText:{
    fontFamily:fonts.regular,
    fontWeight:'400',
    fontSize: dW(14),
    color:Colors.white
  },
  virticalLine:{
    width: 1,
    height: dW(32),
    backgroundColor: Colors.verticalLine,
    borderRadius:5,
    marginEnd: dW(10)
  },
  callingCodeText:{
    color:Colors.white,
    fontFamily:fonts.regular,
    fontWeight:'400',
    fontSize: dW(14),
  }
})
export default styles
