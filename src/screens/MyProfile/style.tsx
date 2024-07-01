import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : 0
  },
  iconDelete:{
    width: 20, height: 20
  },
  forgotPasswordText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    alignSelf: 'center'
  },
  loginImage: {
    height: dH(54),
    width: dW(103),
    top: dH(0),
    position: 'absolute'
  },
  signinHeading: {
    color: Colors.white,
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '700'
  },
  phoneNumberInput: {
    backgroundColor: Colors.textArea_BG,
    width: '100%',
    borderRadius: dW(8),
    padding: dW(16),
    color: Colors.placeHolder,
    fontSize: dW(14),
    fontWeight: '400',
    fontFamily: fonts.regular,
    borderWidth: dW(1),
    borderColor: Colors.inputBorderColor
    // borderColor: 'red'
  },
  textInputArea: {
    width: dW(300),
    height: dH(35),
    borderRadius: dW(8),
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: dH(40)
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
  flag: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flagContainer: {
    borderWidth: dW(1),
    borderColor: Colors.inputBorderColor,
    flexDirection: 'row',
    backgroundColor: Colors.textArea_BG,
    width: dW(350),
    height: dH(35),
    borderRadius: dW(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: dW(16)
  },
  commonButton: {
    alignSelf: 'center',
    bottom: dH(65),
    marginBottom: dH(10)
  },
  userCredentialsContainer: {
    width: '100%',
    height: dH(35),
    alignSelf: 'center',
    borderRadius: dW(8),
  },
  inputFieldHeading: {
    fontSize: dW(14),
    color: Colors.gray,
    fontWeight: '400',
    alignSelf: 'flex-start',
    fontFamily: fonts.regular
  },
  inputFieldHeadingContainer: {
    marginBottom: 8
  },
  parentUserCredentialsContainer: {
    width: dW(350),
    height: dH(55),
    alignSelf: 'center',
    marginTop: dH(18),
    marginHorizontal: dW(8)
  },
  grandUserContainer: {
  },
  phoneNumberArea: {
    height: '100%',
    width: '80%'
  },
  avatarContainer: {
    alignSelf: 'center'
  },
  deleteContainer: {
    alignSelf: 'center',
    borderRadius: dW(30),
    borderWidth: dW(1),    
    borderColor: Colors.inputBorderColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dW(11),    
    paddingHorizontal: dH(20),
    overflow: 'hidden',
    backgroundColor:Colors.textArea_BG
  },
  internalDeleteContainer: {
    width: dH(35),
    height: dW(35),
    alignItems: 'center',
    justifyContent: 'center'
  },
  parentTrashBox: {
    alignSelf: 'center',
    flexDirection: 'row'
  },
  trashText: {
    fontSize:dW(14),
    color: Colors.white,
    fontFamily:fonts.semi_bold,
    alignSelf: 'center',    
  },
  deleteTextBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  countryPickerContainer: {
    marginHorizontal: dW(5)    
  },
  NumberInput: {
    left: dW(-30),
    paddingVertical: Platform.OS === 'ios' ? 10 : 0
  },
  inputPhoneCountry: {
    flex: 1,
    height: '100%'
  },
  inputPhoneCountrySecound:{    
    width: '100%',
    // borderRadius: dW(8),    
    color: Colors.placeHolder,
    fontSize: dW(14),
    fontWeight: '400',
    fontFamily: fonts.regular
  },
  UserImage: {
    height: dW(80),
    width: dW(80),
    borderRadius: dW(228)
  },
  User: {
    right: dW(-58),
    top: dH(-22)
  },
  ColorText: {
    color: Colors.white,    
  },
  countrySelect: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: dW(16)
  },
  callingCodeText: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: dW(14),
  },
  bottomProfileView:{flex: 1,justifyContent:'flex-end'},
  BottomButton:{
    marginTop:dW(24),
    textTransform:'uppercase'
  }
  
})
export default styles
