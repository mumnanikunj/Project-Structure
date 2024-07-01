import React, { FC } from 'react';
import { Image,StyleSheet, TouchableOpacity, View } from 'react-native';

import fonts from '../assets/fonts';
import images from '../assets/images';
import Strings from '../constants/Strings';
import { Logout } from '../functions/commonFunctions';
import { dH, dW } from '../utils/dynamicHeightWidth';
import { Colors } from '../utils/theme';
import { GdText } from './text/gd-text';

interface HeaderProps {
  title: string;
  signout: boolean;
  onClick: any;
  onEndSession: any;
}

const HeaderSettings: FC<HeaderProps> = ({ title, signout, onClick,onEndSession }) => {
  return (
    <View style={styles.headerMainComponent}>
      {title === Strings.my_results && (
        <TouchableOpacity onPress={() => onClick()} hitSlop={20}>
          <Image
            style={{ height: dH(25), width: dW(25) }}
            source={images.auth.back_arrow}></Image>
        </TouchableOpacity>
      )}

      <View style={styles.inner_text}>      
      <GdText style={styles.LeftTextSize} tx={title} />        
        {signout && (
          <TouchableOpacity onPress={async () => {
            await Logout();
          }}>
            <GdText style={styles.signOutText} tx={"sign_out"} />            
          </TouchableOpacity>
        )}

        {title === Strings.my_results && (
          <TouchableOpacity hitSlop={20} onPress={() => {onEndSession();}}>
            <View style={styles.raw}>
              <Image
                resizeMode={"contain"}
                style={{ height: dH(20), width: dW(20) }}
                source={images.home.end_session}></Image>              
              <GdText style={styles.signOutText} tx={"end_session_1"} />   
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMainComponent: {
    height: dH(52),
    // justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dW(4)
  },
  LeftTextSize: {
    fontSize: dW(24),
    fontWeight: '600',
    color: Colors.white,
    fontFamily:fonts.semi_bold
  },
  signOutText: {
    color: Colors.gray,
    fontWeight: '400',
    fontSize: dW(14),
    marginEnd: dW(16),
    fontFamily: fonts.regular
    // marginStart: 10
  },
  inner_text: {
    marginStart: dW(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  raw: {
    flexDirection: 'row', alignItems: 'center', flex: 1
  }
});

export default HeaderSettings;
