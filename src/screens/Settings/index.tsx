import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Intercom, { Space } from '@intercom/intercom-react-native'

import images from '../../assets/images'
import AppGradient from '../../components/AppGradient'
import Button from '../../components/Button'
import HeaderSettings from '../../components/HeaderSettings'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import { translate } from '../../i18n/i18n'
import { languageDetectorPlugin } from '../../i18n/languageDetectorPlugin'
import en from '../../locales/en'
import { dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { styles } from './styles'

const data = [
  {
    Text: 'my_profile',
    icons: images.tabs.userSquare,
    index: 0
  },
  // {
  //   Text: 'Billing method',
  //   icons: images.tabs.BillingMethod,
  //   index: 1
  // },
  {
    Text: 'preferences',
    icons: images.tabs.Preferences,
    index: 2
  },
  {
    Text: "support",
    icons: images.tabs.message,
    index: 3
  },
  {
    Text: 'termsOfUseText',
    icons: images.tabs.termsToUse,
    index: 4
  },
  // {
  //   Text: Strings.subscription,
  //   icons: images.tabs.BillingMethod,
  //   index: 4
  // }
]

interface HeaderProps {
  navigation: any
}

const Settings: FC<HeaderProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const navigateToScreen = (index: number) => {
    if (index === 0) {
      navigation.navigate( ScreenNavigation.screens.MyProfile)
    } else if(index === 1) {
      navigation.navigate( ScreenNavigation.screens.PaymentHistory)
    } else if(index === 2) {
      navigation.navigate( ScreenNavigation.screens.NotificationSetting)
      // navigation.navigate( ScreenNavigation.screens.Support)
    } else if(index === 3) {
      Intercom.presentSpace(Space.home);
    } else if(index === 4) {
      navigation.navigate( ScreenNavigation.screens.TermsPrivacy)
    } else if(index === 5) {
      navigation.navigate( ScreenNavigation.screens.Subscription)
    }
  };

  const renderItems = (items: any) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigateToScreen(items?.item?.index);
          }
          }
          style={styles.RenderItemMain}>
          <Image
            source={items?.item?.icons}
            tintColor={Colors.white}
            style={styles.iconImg}
            // style={{ marginLeft: items?.item?.Text === en.T114 ? dW(3) : dW(0) }}
          />
          {/* <Text
            style={{
              ...styles.itemsText,
              marginLeft: items?.item?.Text === en.T114 ? dW(18) : dW(20)
            }}>
            {items?.item?.Text}
          </Text> */}
          <GdText style={{...styles.itemsText}} tx={items?.item?.Text} />
          {/* <GdText style={{...styles.itemsText,
              marginLeft: items?.item?.Text === en.T114 ? dW(18) : dW(20)}} tx={items?.item?.Text} /> */}
          <TouchableOpacity onPress={() => {
            navigateToScreen(items?.item?.index);
          }}>
            <Image source={images?.auth?.back_arrow} style={styles.imgArrow} />
          </TouchableOpacity>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <SafeAreaView style={styles.SafeArea}>
      <AppGradient />
      <HeaderSettings title={"settings"} signout onClick={() =>{}} onEndSession={() =>{}} />
      <FlatList data={data} renderItem={renderItems} contentContainerStyle={styles.listRoot} />
      <View style={styles.VersionCon}>
        {/* <Text style={styles.VersionText}>{en.T116}</Text> */}
        {/* <GdText style={styles.VersionText} tx="note_first" /> */}
        {/* <Text style={styles.VersionText}>{i18n.translations.sign_in}</Text> */}
        {/* <GdText style={styles.VersionText} tx={"sign_in"} /> */}
        {/* <Text style={styles.VersionText}>{translate('sign_in')}</Text> */}

        {/* <Button 
        heading='change'
        onPress={() => languageDetectorPlugin.cacheUserLanguage("ja")}
        /> */}
      </View>
    </SafeAreaView>
  )
}

export default Settings
