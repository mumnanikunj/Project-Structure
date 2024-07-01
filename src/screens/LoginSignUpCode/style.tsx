import {Platform, StyleSheet} from 'react-native'

import fonts from '../../assets/fonts'
import {dH, dW} from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import responsive from '../../utils/theme/responsive'
import { Constants } from '../../utils/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
    //   alignItems:'center',
    //   justifyContent:'center',
    // backgroundColor:Colors.fonApp,
  },
  contentContainer: {
    flex: 1
  },
  forgotPasswordText: {
    // color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center'
  },
  innerContainer: {},
  signinHeading: {
    color: Colors.white,
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '700'
  },
  phoneNumberInput: {
    // width:dW(260),
    // height:dH(35),
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 8
  },
  otpContainer: {
    marginHorizontal: dW(24)
  },
  internalTextInputArea: {
    backgroundColor: Colors.white,
    width: '20%',
    height: '100%',
    borderRadius: dH(5)
  },
  otpInput: {
    backgroundColor: Colors.white,
    width: '20%',
    height: '100%',
    borderRadius: dH(5),
    borderWidth:2,
    textAlign: 'center',
    fontFamily: fonts.light,
    fontSize: responsive.convertFontScale(32)
  },
  parentContainer: {
    // flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginTop: dH(70),
    height: '25%'
    // backgroundColor:'red',
  },
  confirmationText: {
    color: Colors.white,
    alignSelf: 'center'
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    bottom: dH(33),
    position: 'absolute'
  },
  signInText: {
    color: Colors.green,
    marginLeft: 10
  },
  flag: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dH(30)
  },
  commonButton: {
    justifyContent: 'flex-end',
    marginBottom: Constants.buttonBottomMargin
  },
  noteText: {
    color: Colors.white,
    fontSize: 16,
    alignSelf: 'center'
  },
  noteBox: {
    width: dW(300),
    height: dH(33),
    alignSelf: 'center',
    marginTop: dH(20)
  },
  resendCodeTextBox: {
    width: dW(300),
    height: dH(33)
    // alignSelf:'center',
    // marginTop:dH(20),
    // alignItems:'center',
    // backgroundColor:'yellow',
  },
  checkBoxTwo: {
    color: Colors.green
  },
  parentCheckBoxText: {
    color: Colors.white,
    fontSize: 16
  },
  clickableCheckbox: {
    alignSelf: 'center'
  },
  checkBoxArea: {
    // backgroundColor:'yellow',
    flexDirection: 'row',
    height: dH(40),
    width: '100%',
    // marginLeft:dW(25),
    alignItems: 'center',
    alignSelf: 'center',
    // paddingBottom:10,
    justifyContent: 'center',
    marginTop: dH(15)
  },
  tickBox: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  tickBoxView: {
    height: dH(30),
    width: dW(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    borderRadius: dH(5),
    // marginTop:dH(22),
    marginRight: dW(15)
  },
  comboContainer: {
    width: dW(320),
    height: dH(100),
    // backgroundColor:'yellow',
    alignSelf: 'center'
    // flex:1,
  },
  parentCheckBox: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: dW(5)
  },
  otpNote: {
    // marginTop: dH(32),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center'
  },
  resendCodeText: {
    color: Colors.white
  },
  resendCodeTextSeconds: {
    color: Colors.green_light
  },
  secondsContainer: {
    alignSelf: 'center'
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: responsive.convertFontScale(14),
    color: Colors.red,
    width:'75%',
    alignSelf: 'center',
    marginVertical: dH(8)
  },
  resendText:{
    color:Colors.ligth_green,
    fontFamily:fonts.regular,
    fontWeight:'400',
    fontSize:16
  }
})
export default styles
