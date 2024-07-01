import React from "react"
import { Text, View } from "react-native"

import ComponentStyle from "../../components/ComponentStyle"
import StarRating from "../../components/StarRating"
import { GdText } from "../../components/text/gd-text"
import { CommonStyles } from "../../utils/theme/commonStyle"
import { styles } from "./styles"

export const RatingSelectionView = ({ onCancel, onSelectRating }: any) => {
    return (<View style={CommonStyles.flex}>
        <GdText style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]} tx={'love_app'}/>
        <GdText style={[ComponentStyle.text_h2, ComponentStyle.marginTopButton3,
        styles.subTitleBuy]} tx={'love_app_desc'}/>
        <View style={styles.ratingViewRoot}>
            <StarRating ratingDefault={0} onRatingPress={(rating: number) => {
                onSelectRating(rating)
            }} />
        </View>
        <View style={CommonStyles.flex}/>
        <Text
            onPress={onCancel}
            style={styles.txtCancel}><GdText tx={'cancel'}/></Text>
    </View>)
}