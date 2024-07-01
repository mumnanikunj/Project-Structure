import React, { useState } from "react"
import { Keyboard, Text, TextInput, View } from "react-native"
import _ from "lodash"

import Button from "../../components/Button"
import ComponentStyle from "../../components/ComponentStyle"
import Strings from "../../constants/Strings"
import EndPoints from "../../utils/api/endpoints"
import { Colors } from "../../utils/theme"
import { styles } from "./styles"
import { GdText } from "../../components/text/gd-text"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"

interface IRatingSubmit {
    userRating: number
    giveRating: (payload: any) => void
}
export const RatingSubmit = ({ userRating, giveRating }: IRatingSubmit) => {
    const [feedback, setFeedback] = useState<string>("")
    const { t }: {t: TFunction} = useTranslation()
    const callAPI = async () => {
        const payload = {
            rating: userRating,
            feedback,
            app_store_rated: false
        }
        giveRating(payload)
    }

    const onDoneKeyPress = ({ nativeEvent }: any) => {
        if (nativeEvent.key === "Enter") {
            Keyboard.dismiss()
            if (_.size(_.trim(feedback)) > 10) {
                callAPI()
            }
        }
    }

    return (<View>
        {/* <Text style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]}>
            {Strings.not_perfact}
        </Text> */}
        <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]} tx={'not_perfact'}/>
        {/* <Text style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3,
        styles.subTitleBuy]}>{Strings.not_perface_desc}</Text> */}
        <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3,
        styles.subTitleBuy]} tx={'not_perface_desc'}/>
        <View style={styles.textInputStyleRoot}>
            <TextInput
                placeholder={t('add_comment')}
                style={styles.textInputStyle}
                placeholderTextColor={Colors.gray}
                multiline
                maxLength={1000}
                textAlignVertical={"top"}
                value={feedback}
                onChangeText={(text) => {
                    setFeedback(text);
                }}
                onKeyPress={onDoneKeyPress}
                returnKeyType={'done'}
                autoCapitalize={"none"}
            />
        </View>
        <Button heading={'send_feedback'}
            exStyle={{}}
            isDisabled={_.size(_.trim(feedback)) < 10}
            onPress={() => callAPI()} />
        {/* <Text
            onPress={onCancel}
            style={styles.txtCancel}>{Strings.cancel}</Text> */}
    </View>)
}