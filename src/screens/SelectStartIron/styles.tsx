import {StyleSheet} from 'react-native'

import fonts from '../../assets/fonts'
import {dH, dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'

export const styles = StyleSheet.create({
  mainView : {
    flex: 1
  },
  TextStyleNew: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '400'
  },
  TopCon: {
    flexDirection: 'row',
    backgroundColor: Colors.darkblue,
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: dH(40),
    alignSelf: 'center'
  },
  TopConText: {
    color: Colors.white,
    marginLeft: 10
  },
  YearText: {
    color: Colors.green,
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10
  },
  TopHeaderImage: {
    paddingBottom: dH(10),
    maxHeight: dH(200)
  },
  DistanceText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16,
    marginTop: 24
  },

  drop_view: {
    marginTop: dH(10),
    paddingVertical: dH(5),
    backgroundColor: Colors.lightblack,
    borderRadius: 30,
    width: '60%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: dW(10)
  },

  hole_image: {width: dW(35), height: dW(35)},
  drop_arrow: {width: dW(30), height: dW(30)},
  how_play: {width: dW(20), height: dW(20)},
  drop_text: {
    flex: 1,
    color: Colors.green,
    fontSize: 28,
    marginHorizontal: dW(10),
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontWeight: '300'
  },

  HeaderTop: {
    flexDirection: 'row',
    marginHorizontal: dW(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24
  },
  PlayNowText: {
    color: Colors.white,
    fontSize: 16
  },

  play_view: {
    flexDirection: 'row',
    borderColor: Colors.lightblack,
    paddingHorizontal: dW(10),
    paddingVertical: dH(8),
    borderRadius: 25,
    borderWidth: 1,
    width: dW(180),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: dH(16)
  },
  KindGameText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: fonts.regular,
    fontWeight: '300',
    marginStart: 20
  },

  iron_text: {
    fontSize: 32,
    fontFamily: fonts.medium,
    fontWeight: '400'
  },
  MessageCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  IronConFlatList: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: dW(30),
    paddingVertical: dW(15),
    marginRight: 10,
    borderWidth: 1,
    marginTop: 20,
    height: 100,
    width: 120
  },

  border_less: {
    borderColor: Colors.lightblack
  },

  border: {
    borderColor: Colors.green
  },
  bottom: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
