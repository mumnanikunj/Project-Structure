import React from 'react'
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import {Portal} from '@gorhom/portal'
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates'

import images from '../assets/images'
import Strings from '../constants/Strings'
import { dH } from '../utils/dynamicHeightWidth'
import {Colors} from '../utils/theme'
import { CommonStyles } from '../utils/theme/commonStyle'
import Button from './Button'
import ComponentStyle from './ComponentStyle'
import { GdText } from './text/gd-text'

const AppUpdateSheet = ({alertRef}: any) => {

  const inAppUpdates = new SpInAppUpdates(
    false // isDebug
  );

  return (
      <Portal>
        <RBSheet
          height={dH(300)}
          openDuration={250}
          closeonDrag
          closeOnDragDown
          closeOnPressMask
          ref={alertRef}
          customStyles={{
            container: CommonStyles.bottomSheetContainer,
            wrapper: CommonStyles.bottomSheetWrapper,
            draggableIcon: CommonStyles.bottomSheetIcon
          }}
        >
          <View style={ComponentStyle.bottom_shett_view}>

          <Image
              resizeMode={'contain'}
              style={ComponentStyle.alertImage}
              source={images.update}
            />

            <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton2]} tx={'update_title'}/>            
            <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3]} tx={'update_message'}/>
           
            <Button heading={'update'} onPress={() => {
              let updateOptions: StartUpdateOptions = {};
              if (Platform.OS === 'android') {
                // android only, on iOS the user will be promped to go to your app store page
                updateOptions = {
                  updateType: IAUUpdateKind.FLEXIBLE
                };
              }
              inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
              alertRef?.current?.close()
          } } exStyle={undefined} isDisabled={false} />
            <TouchableOpacity hitSlop={10} onPress={() => alertRef?.current?.close()}>              
              <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3]} text={'cancel'}/>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </Portal>
  )
}

export default AppUpdateSheet
