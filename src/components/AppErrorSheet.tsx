import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSelector } from 'react-redux'
import { Portal } from '@gorhom/portal'

import images from '../assets/images'
import Strings from '../constants/Strings'
import APICall from '../utils/api/api'
import { dH } from '../utils/dynamicHeightWidth'
import { Colors } from '../utils/theme'
import { CommonStyles } from '../utils/theme/commonStyle'
import Button from './Button'
import ComponentStyle from './ComponentStyle'
import { GdText } from './text/gd-text'

const AppErrorSheet = ({ alertRef }: any) => {

  const message = useSelector((state: any) => state.SessionReducer.message);
  const callBack = useSelector((state: any) => state.SessionReducer.callBack);

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
            source={images.alertError}
          />
          <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton2]} tx={'error_alert_title'} />
          <Text style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3]}>
            {message}
          </Text>

          <Button heading={'try_again'} onPress={() => {
            // setCallback();
            if (callBack?.method) {
              APICall(callBack?.method, callBack?.body, callBack?.url, callBack?.formData)
            }
            alertRef?.current?.close()
          }} exStyle={undefined} isDisabled={false} />
          <TouchableOpacity style={ComponentStyle.cancelButtonPadding} hitSlop={10} onPress={() => alertRef?.current?.close()}>
            <GdText style={ComponentStyle.text_h2} tx={'cancel'} />
          </TouchableOpacity>
        </View>
      </RBSheet>
    </Portal>
  )
}

export default AppErrorSheet
