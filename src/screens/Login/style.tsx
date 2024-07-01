import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts';
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme';
import responsive from '../../utils/theme/responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0),
  },
  flex1: {
    flex: 1
  },
  buttonSign: {
    marginVertical: dW(29),
    // marginTop: dW(50)
  },
  forgotPasswordText: {
    // color: Colors.white,
    fontWeight: '400',
    fontSize: 16,
    color: Colors.white,
    alignSelf: 'center'
  },
  innerContainer: {
    marginTop: dH(64)
  },
  signInHeadingText: {
    color: Colors.white,
    fontSize: dW(24),
    fontWeight: '600',
    fontFamily: fonts.semi_bold
  },
  phoneNumberInput: {
    backgroundColor: Colors.textArea_BG,
    width: '100%',
    color: Colors.white,
    fontSize: dW(14),
    fontWeight: '400',
    borderRadius: dW(20),
    overflow: 'hidden'
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
    borderColor: Colors.inputBorderColor
  },
  parentContainer: {
    // flex: 1,
    // justifyContent: 'space-between',
    margin: dW(24),
    marginBottom: 15
    // marginTop: dH(70)
    // height:'40%'
  },
  confirmationText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400'
  },
  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: dH(10)
  },
  signInText: {
    color: Colors.green,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400'
  },
  flag: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row"
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: responsive.convertFontScale(14),
    color: Colors.red,
    width: '85%',
    alignSelf: 'center',
    marginVertical: dH(8)
  },
  country: {
    marginLeft: 5
  },
  videoContainer: {
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  video: {
    position: 'absolute',
    // ...StyleSheet.absoluteFill,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  secoundContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  // eslint-disable-next-line react-native/no-color-literals
  promoVideo: {
    position: 'absolute',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFill
  },
  downArrow: {
    height: dW(12),
    width: dW(12),
    marginHorizontal: dW(10)
  },
  countrySelect: {
    flexDirection: "row",
    alignItems: "center",
    marginStart: dW(16)
  },
  countryCodeText: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: dW(14),
    color: Colors.white
  },
  virticalLine: {
    width: 1,
    height: dW(32),
    backgroundColor: Colors.verticalLine,
    borderRadius: 5,
    marginEnd: dW(10)
  },
  callingCodeText: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: dW(14),
  },
  localization_View: {
    top: dW(44),
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: Colors.update_sheet_BG,
    marginHorizontal: dW(19),
    height: dW(38),
    width: dW(75),
    justifyContent:"space-evenly",
    alignItems:"center",
    borderRadius:dW(75)
  },
  localization_Text: {
    color: Colors.placeHolder,
    fontSize:dW(14),
    fontFamily:fonts.regular,
    fontWeight:'400'
  },
  bottomSheetContainer: {
    borderRadius:0,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: Colors.update_sheet_BG 
  }
});
export default styles;