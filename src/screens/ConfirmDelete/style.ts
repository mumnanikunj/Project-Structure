import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  contentContainer: {
    flex: 1
  },
  signinHeading: {
    color: Colors.white,
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '700'
  },
  txtSubTitle: {
    marginTop: dW(32),
    marginHorizontal: dW(56),
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: "400",
    color: Colors.white,
    textAlign: 'center'
  },
  btnDelete: {
    backgroundColor: Colors.lightorange,
    width: '85%'
  },
  btnTextDelete: {
    color: Colors.white,
  }
})
export default styles
