import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import StartEmpty from '../assets/svg/star_empty.svg'
import StarFill from '../assets/svg/star_fill.svg'
import { dW } from '../utils/dynamicHeightWidth';

interface IStarRating {
  ratingDefault: number
  totalStars?: number
  onRatingPress: (value: number) => void
}

const StarRating = ({ ratingDefault, onRatingPress, totalStars = 5 }: IStarRating) => {
  const [rating, setRating] = useState(ratingDefault);

  return (
    <View style={styles.root}>
      {[...Array(totalStars)].map((_, index) => {
        const ImageIcon = index + 1 <= rating ? StarFill : StartEmpty
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onRatingPress(index + 1)
              setRating(index + 1)
            }}
          >
            <ImageIcon width={dW(44)} height={dW(44)} />
          </TouchableOpacity>
        )
      })}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})