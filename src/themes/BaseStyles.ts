import {StyleSheet} from 'react-native';
import {Colors} from '@/themes/Colors';

export const BaseStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  bgWhiteFlex1: {
    flex: 1,
    backgroundColor: Colors.white
  },
  indexLetterStyle: {
    color: Colors.yellowOrange,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.12,
  },
  indexLetterContainerStyle: {
    width: 20,
    height: 25,
  },
  letterListContainerStyle: {
    justifyContent: 'center',
    paddingTop: 8,
  },
  indexContainerStyle: {
    width: 30,
  },
});
