import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal } from '@gorhom/portal';

import fonts from '../assets/fonts';
import images from '../assets/images';
import Strings from '../constants/Strings';
import { dH, dW } from '../utils/dynamicHeightWidth';
import { Colors } from '../utils/theme';
import { CommonStyles } from '../utils/theme/commonStyle';
import ComponentStyle from './ComponentStyle';
import { GdText } from './text/gd-text';


const GameModes = () => {

  const bottomSheetRef = useRef<RBSheet>();
  const insets = useSafeAreaInsets();

  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.open();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => onAddButtonPress()}>
        <View style={ComponentStyle.MessageCon}>
          <Image source={images.home.vector} tintColor={Colors.green} style={styles.image} />
          {/* <Text style={ComponentStyle.KindGameText}>{Strings.what_kind_of_game_title}</Text> */}
          <GdText style={ComponentStyle.KindGameText} tx={"what_kind_of_game_title"} />
        </View>
      </TouchableWithoutFeedback>
      <Portal>
        <RBSheet
          height={(Dimensions.get('window').height - dH(180))}
          openDuration={250}
          closeonDrag
          closeOnDragDown
          closeOnPressMask
          ref={bottomSheetRef}
          customStyles={{
            container: CommonStyles.bottomSheetContainer,
            wrapper: CommonStyles.bottomSheetWrapper,
            draggableIcon: CommonStyles.bottomSheetIcon
          }}>

          <View style={ComponentStyle.bottom_shett_view}>
            {/* <Text style={[styles.text_h1, ComponentStyle.marginTopButton1]}>
              {Strings.what_kind_of_game_title}
            </Text> */}
            <GdText style={[styles.text_h1, ComponentStyle.marginTopButton1]} tx={"what_kind_of_game_title"} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <GdText style={styles.text_h3} tx={"pin_finder"} />
              <GdText style={styles.text_h2} tx={"pin_finder_desc"} />
              <GdText style={styles.text_h3} tx={"the_range"} />
              <GdText style={styles.text_h2} tx={"the_range_desc"} />
              <GdText style={styles.text_h3} tx={"battle_royale"} />
              <GdText style={styles.text_h2} tx={"battle_royale_desc"} />
            </ScrollView>
          </View>
        </RBSheet>
      </Portal>

    </>
  );
};

export default GameModes;

const styles = StyleSheet.create({
  margin: {
    marginBottom: dH(30)
  },
  fullWidth: {
    width: '100%'
  },
  padding: {
    paddingHorizontal: dW(20)
  },
  image: {
    marginRight: 10
  },
  text_h1: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center'
  },
  text_h3: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: Colors.white,
    marginHorizontal: dW(16),
    marginBottom: dH(16),
    marginTop: dH(32)
  },
  text_h2: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 16,
    color: Colors.white,
    marginHorizontal: dW(16)
  }
})