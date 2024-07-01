import { StyleSheet } from "react-native";

import fonts from "../../assets/fonts";
import { dH, dW } from "../../utils/dynamicHeightWidth";
import { Colors } from "../../utils/theme";
import responsive from "../../utils/theme/responsive";

const BUTTON_SIZE = 50;

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnCloseRoot:{
    flexDirection: 'row',
    marginTop: dW(35),
    paddingHorizontal: dW(16),
  },
  mastRoot:{
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
    flexDirection: 'row'
  },
  txtTargetDistance: {
    fontSize: 16,
    fontFamily: fonts.regular,
    fontWeight: "400",
    color: Colors.white
  },
  txtTargetValue: {
    fontSize: 32,
    fontFamily: fonts.regular,
    color: Colors.green,
    fontWeight: "400"
  },
  backButton: {
    left: 16,
    position: 'absolute'
  },
  timer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black70,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16
  },
  targetDataRoot: {
    backgroundColor: Colors.black50,
    position: 'absolute',
    alignItems: 'center',
    height: dH(130),
    left: 0,
    right: 0,
    width: '100%'
  },
  timerBack: {
    // backgroundColor: Colors.white,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dW(32),
    paddingVertical: dH(16),
    margin: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: .9,
    shadowRadius: 16,
    elevation: 16
  },
  timerText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: fonts.timerFont,
    fontSize: responsive.convertFontScale(300)
  },
  recordText: {
    fontSize: responsive.convertFontScale(60)
  },
  imageClose: {
    height: dH(24),
    width: dW(24)
  },
  button: {
    marginBottom: 16,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: Colors.camera_btn_back,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dW(-15)
  },
  rightButtonRow: {
    position: 'absolute',
    right: 16,
    top: 60
  },
  text: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  header: {
    backgroundColor: Colors.black50,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: dW(16)
  }
});