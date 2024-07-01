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
    paddingVertical: dW(17),
    marginHorizontal: dW(16),
    backgroundColor: Colors.textArea_BG,
    borderRadius: dW(16),
    marginBottom: dH(12)
  },
  listRoot: {
    marginTop: dW(32)
  },
  imgArrow: {
    transform: [{ rotate: '180deg' }],
    width: dW(24),
    height: dW(24)
  },
  iconImg: {
    width: dW(24),
    height: dW(24)
  },
  itemsText: {
    fontSize: dW(14),
    color: Colors.white,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: dW(10),
    fontFamily: fonts.semi_bold
  },
  itemsTextTime: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '400',
    flex: 0.4,
    textAlign: 'right'
  },
  VersionCon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: dH(20)
  },
  VersionText: {
    color: Colors.green_light,
    fontWeight: '400',
    fontFamily: fonts.regular,
    fontSize: dW(14)
  },
  SafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  }
})
