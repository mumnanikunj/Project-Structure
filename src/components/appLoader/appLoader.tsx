import React, { forwardRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

import { SvgImage } from '../../assets/svg/SvgPath';
import { Colors, Responsive } from '../../utils/theme';
import { LoaderView } from '../../utils/theme/commonStyle';

const AppLoader = forwardRef((props: any, ref: any) => {
  const spinValue = new Animated.Value(0);

  const startLoaderAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  };

  startLoaderAnimation();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LoaderView>
      <LoaderInnerView>
        {/* <ActivityIndicator
          animating
          size={'large'}
          color={Colors.green}
        /> */}
        <View style={styles.container}>
          <SvgImage.loader_circle width={70} height={70} />
          <Animated.View style={[styles.progress, { transform: [{ rotate: spin }] }]} />
        </View>
      </LoaderInnerView>
    </LoaderView>
  );
});
// background-color: ${Colors.white};
export default AppLoader;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.green,
    borderTopColor: Colors.transparent,
    borderRightColor: Colors.transparnt,
    position: 'absolute'
  }
});

const LoaderInnerView = styled.View`

  width: ${Responsive.widthPercentageToDP(100)}px;
  height: ${Responsive.widthPercentageToDP(100)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${Responsive.widthPercentageToDP(10)}px;
`;
