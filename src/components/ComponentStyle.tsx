import { Dimensions, Platform, StyleSheet } from 'react-native'

import fonts from '../assets/fonts'
import { dH, dW } from '../utils/dynamicHeightWidth'
import { Colors } from '../utils/theme'

const ComponentStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0    
  },
  cancelButtonPadding: {
    paddingVertical: dH(8)
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerBox: {
    height: dH(10),
    width: dW(10),
    backgroundColor: Colors.green
  },
  customButton: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.07,
    backgroundColor: Colors.green
  },
  BtnCon: {
    height: dH(33),
    paddingHorizontal: 20,
    borderRadius: 20,
    width: dW(180),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.green
  },
  bottom_img: {
    height: dH(48),
    resizeMode: 'contain',
    width: dW(48),
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? dH(10) : 0
  },
  tab_back: {
    width: '100%',
    flex: 1,
    height: Platform.OS === 'ios' ? 100 : 72,
    padding: Platform.OS === 'ios' ? 10 : 0
  },
  bottom_shett_view: {
    alignItems: 'center',
    flex: 1
  },
  bottom_sheet_modal: {
    backgroundColor: Colors.fonApp,
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: dH(16)
  },
  button: {
    height:dW(24),
    width:dW(24),
    right:dW(12)
  },
  button2:{
    height:dW(31),
    width:dW(31),
    right:dW(12)
  },
  club_img: {
    width: '100%',
    height: dH(200)
  },
  marginTopButton1: {
    marginTop: dH(20),
    
  },
  marginTopButton2: {
    // marginTop: dH(10)
  },
  marginTopButton3: {
    marginTop: dH(8)
  },
  marginTopButton4: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center'
  },
  sheetBorderRadius: {
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19
  },
  containerCustom: {
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: Colors.lightblack
  },
  text_h1: {
    fontFamily: fonts.bold,
    fontWeight: '600',
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center'
  },
  text_h2: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center'
  },
  image_add: {
    width: dW(40),
    height: dH(23)
  },
  view_add_minus: {
    
    flexDirection: 'row',
    
    marginTop: dH(30),
    
     marginHorizontal: dW(20),
      alignItems: 'center',
      justifyContent: 'center'
   
  },
  text_h0: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontSize: 30,
    fontWeight: '300'
  },
  text_h3: {
    fontFamily: fonts.bold,
    fontWeight: '600',
    fontSize: 20,
    color: Colors.white
  },
  view_line: {
    height: dH(25),
    width: 2,
    backgroundColor: Colors.white,
    marginHorizontal: dW(7)
  },
  MessageCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  KindGameText: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontSize: 14
  },
  update_parentt: {
    width: '100%',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center'
  },
  update_modal: {
    // shadowColor: Colors.white,
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 24,
    width: Dimensions.get('window').width - dW(30),
    backgroundColor: Colors.white,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: dW(16),
    paddingHorizontal: dH(16),
    paddingVertical: dW(24)
  },
  textCancel: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: '400',
    top: dW(-5)
  },
  touchStyle: {
    marginBottom: dH(10)
  },
  paddingBottom: {
    marginBottom: dH(15),
    flexDirection:'row',
    backgroundColor:Colors.white,    
    width:dW(327),
    height:dW(48),
    justifyContent:"center",
    alignItems:'center',
    borderRadius:dW(48)
  },
  CustomButtonStyle:{
    marginBottom: dH(15),
    flexDirection:'row',
    backgroundColor:Colors.Orange_Ligth,    
    width:dW(327),
    height:dW(48),
    justifyContent:"center",
    alignItems:'center',
    borderRadius:dW(48)
  },
  alertImage: {
    width: dW(278),
    height: dH(100)
  },  
  buyTextStyle:{  
    color:Colors.textArea_BG,
    fontFamily:fonts.regular,
    fontSize:dW(16),
    fontWeight:'400'
  }

})

export default ComponentStyle
