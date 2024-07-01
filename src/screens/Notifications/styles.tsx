import { Platform, StyleSheet } from 'react-native'

import fonts from '../../assets/fonts'
import { dH, dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

export const styles = StyleSheet.create({
  RenderItemMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dW(16),
    paddingVertical: dH(18)
  },
  itemsText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '400',
    flex: 1,
    marginHorizontal: dW(10),
    paddingLeft: dW(10),
    fontFamily: fonts.regular
  },
  itemsTextTime: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '400',
    flex: 0.4,
    textAlign: 'right'
  },
  bottomLine: {
    height: dW(0.7),
    backgroundColor: Colors.green_light,
    marginHorizontal: dW(16)
  },
  notificationCon: {
    width: dW(34),
    height: dH(27),
    borderRadius: 20,
    backgroundColor: Colors.lightblack,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 1
  }
})
