import {Platform, StyleSheet} from 'react-native'

import fonts from '../../assets/fonts'
import {dH, dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    paddingTop: Platform.OS === 'android' ? dH(24) : dH(0)
  },
  item: {
    elevation: 16,
    shadowColor: Colors.white,
    marginBottom: dH(16)
  },
  listRoot:{
    marginHorizontal: dW(16),
    marginTop: dH(16)
  },
  HeaderTop: {
    flexDirection: 'row',
    marginHorizontal: dW(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent:'space-between',
    paddingHorizontal: dW(4),
    marginTop: dH(12)
  },
  PlayNowText: {
    color: Colors.white,
    fontSize: dW(24),
    fontWeight: '600',
    fontFamily: fonts.semi_bold
  },
  MessageCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  KindGameText: {
    color: Colors.white
  },
  ImagebgCon: {
    width: '100%',
    height: dW(156),
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'column',
    paddingVertical: 18,
    borderRadius: 16,
    overflow: 'hidden'
  },
  imageOverLay: {
     position: 'absolute', left: 0, right: 0 
  },
  BottomCon: {
    // position:'relative',
    // bottom:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  TextStyle: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '800',
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
    flex: 1
  },
  TextStyleNew: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "400"
  },
  TopCon: {
    flexDirection: 'row',
    backgroundColor: Colors.Pinkdark,
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'space-between'
  },
  TopConText: {
    color: Colors.white,
    marginLeft: 10,
    fontFamily: fonts.regular
  },
  item_view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  image: {
    marginRight: 10
  }
})
