import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number => size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor: number = 0.5): number => size + (verticalScale(size) - size) * factor;
const textScale = (percent: number): number => {
  const screenHeight: number = Dimensions.get('window').height;
  // calculate absolute ratio for bigger screens 18.5:9 requiring smaller scaling
  const ratio: number = Dimensions.get('window').height / Dimensions.get('window').width;
  // Guideline sizes are based on standard ~5″ screen mobile device
  const deviceHeight: number = 375
    ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15) // Set guideline depending on absolute ratio
    : Platform.OS === 'android'
      ? screenHeight - Number(StatusBar.currentHeight)
      : screenHeight;

  const heightPercent: number = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

export { scale, verticalScale, textScale, moderateScale, moderateScaleVertical, width, height };
