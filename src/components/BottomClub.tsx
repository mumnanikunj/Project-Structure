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
import { Portal } from '@gorhom/portal';

import images from '../assets/images';
import Strings from '../constants/Strings';
import { dH, dW } from '../utils/dynamicHeightWidth';
import { Colors } from '../utils/theme';
import { CommonStyles } from '../utils/theme/commonStyle';
import Button from './Button';
import ComponentStyle from './ComponentStyle';
import { GdText } from './text/gd-text';


const BottomClub = () => {

  const bottomSheetRef = useRef<RBSheet>();
  // Expands the bottom sheet when our button is pressed
  const onAddButtonPress = () => {
    bottomSheetRef?.current?.open();
  };


  return (
    <>
      <TouchableWithoutFeedback onPress={() => onAddButtonPress()}>
        <View style={ComponentStyle.MessageCon}>
          <Image source={images.home.vector} tintColor={Colors.green} style={styles.image} />
          <Text style={ComponentStyle.KindGameText}>{"Need help?"}</Text>
          <GdText style={ComponentStyle.KindGameText} tx={'need_help'} />
        </View>

      </TouchableWithoutFeedback>
      <Portal>
        <RBSheet
          height={Dimensions.get('window').height - 100}
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
            <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]} tx={'whats_club'} />
            <ScrollView style={{ marginHorizontal: 20 }}>
              <Image
                style={[ComponentStyle.club_img, ComponentStyle.marginTopButton1]}
                source={images.home.club_back} />
              <GdText style={[ComponentStyle.text_h3, ComponentStyle.marginTopButton1, styles.fullWidth]} tx={'understanding_golf_clubs'} />

              <GdText style={[ComponentStyle.text_h2, styles.txtDescription]} tx={'club_des'} />
            </ScrollView>

            <Button exStyle={styles.margin} heading={'ok'} onPress={() => bottomSheetRef?.current?.close()} isDisabled={false}></Button>



          </View>

        </RBSheet>
      </Portal>

    </>
  );
};

export default BottomClub;

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
  txtDescription: {
    textAlign: 'left',
    marginTop: dH(16)
  }
})