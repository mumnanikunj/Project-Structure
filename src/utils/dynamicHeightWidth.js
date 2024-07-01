import {Dimensions} from 'react-native';

/**
 * dimension class
 */
export const standardDeviceSize = {width: 375, height: 667};

export const actualDeviceSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export const dH = actualHeight => {
  const heightRatio = (actualHeight + 0) / standardDeviceSize.height;
  const windowHeight = Dimensions.get('window').height;
  const reqHeight = heightRatio * windowHeight;
  return reqHeight;
};

export const dW = actualWidth => {
  const widthRatio = (actualWidth + 0) / standardDeviceSize.width;
  const windowWidth = Dimensions.get('window').width;
  const reqWidth = widthRatio * windowWidth;
  return reqWidth;
};

export const windowWidth = () => {
  const windowWidth = Dimensions.get('window').width;
  return windowWidth;
};
export const windowHeight = () => {
  const windowHeight = Dimensions.get('window').height;
  return windowHeight;
};
