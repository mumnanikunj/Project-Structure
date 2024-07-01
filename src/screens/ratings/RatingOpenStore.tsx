import React from "react"
import { Linking, Text, View } from "react-native"
import InAppReview from 'react-native-in-app-review';

import { SvgImage } from "../../assets/svg/SvgPath";
import Button from "../../components/Button"
import ComponentStyle from "../../components/ComponentStyle"
import { GdText } from "../../components/text/gd-text";
import { Constants } from "../../utils/constants";
import { dW } from "../../utils/dynamicHeightWidth";
import { CommonStyles } from "../../utils/theme/commonStyle";
import { styles } from "./styles"

interface IRatingOpenStore {
    onCancel: () => void
    onGiveRating: (payload: any) => void
}

export const RatingOpenStore = ({ onCancel, onGiveRating }: IRatingOpenStore) => {

    const openInAppRating = () => {
        InAppReview.RequestInAppReview()
            .then((hasFlowFinishedSuccessfully) => {
                console.log("hasFlowFinishedSuccessfully ", hasFlowFinishedSuccessfully)
                if (hasFlowFinishedSuccessfully) {
                    // onCancel()
                }
            })
            .catch((error) => {
                openStoreLink()
            });

    }
    const openStoreLink = () => {
        try {
            const link = Constants.IS_ANDROID ? Constants.GOOGLE_STORE : Constants.APP_STORE
            Linking.openURL(link)
        } catch (error) {
            onCancel()
        }
    }

    const openReview = async (): Promise<void> => {
        onGiveRating({ app_store_rated: true })
        if (InAppReview.isAvailable()) {
            openInAppRating()
            return;
        }
        openStoreLink()
    }

    return (<View style={CommonStyles.flex}>
        <View style={styles.lineImg}>
            <SvgImage.SheetLine width={dW(40)} />
        </View>
        <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]} tx={'thanks'} />
        <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3,
        styles.subTitleBuy]} tx={'rateOnStore'} />
        <Button
            heading={'rate_app'}
            exStyle={{ marginVertical: dW(32) }}
            onPress={openReview} />
        <View style={CommonStyles.flex} />
        <Text
            onPress={onCancel}
            style={styles.txtCancel}><GdText tx={'cancel'} /></Text>
    </View>)
}