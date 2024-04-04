import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, TextInput, KeyboardTypeOptions } from 'react-native';
import { moderateScale, moderateScaleVertical, textScale } from '../helper/responsiveSize';
import { Color } from '../styles/styles';
import { FontsFamily } from '../utility/util';

interface MyTextInputProps {
  value: string;
  title: string;
  autocapitalize?: boolean;
  onChageText: (value: any, attr: string) => void;
  onChageValidation: (value: any, attr: string) => void;
  RemoveText: string;
  attrName: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength: number;
  editable: boolean;
  error: any;
  secureTextEntry:boolean;
}

const MyTextInput: React.FC<MyTextInputProps> = ({
  value,
  title,
  autocapitalize = false,
  onChageText = (value: any, attr: string) => { },
  onChageValidation = (value: any, attr: string) => { },
  RemoveText,
  attrName,
  keyboardType,
  maxLength,
  editable = true,
  error,
  secureTextEntry=false
}) => {
  const [isFieldActive, setisFieldActive] = useState<boolean>(false);
  let position = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setisFieldActive(true);
    Animated.timing(position, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    onChageValidation(RemoveText ? value.replace(RemoveText, '') : value, attrName)
    if (!value) {
      setisFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const onChangeText = (updatedValue: string) => {
    onChageText(RemoveText ? updatedValue.replace(RemoveText, '') : updatedValue, attrName);
  };

  const AnimationTextStyle = () => {
    let titleActiveSize = textScale(11.5);
    return {
      transform: [
        {
          translateY: position.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
      ],
      fontSize: titleActiveSize,
      color: Color.Black,
      marginTop: moderateScaleVertical(isFieldActive && value ? 8 : 5),
    };
  };

  return (
    <View style={[styles.Container, { ...error }]}>
      <Animated.Text style={[styles.titleStyles, AnimationTextStyle()]}>
        <Text style={{ color: Color.Gray }}>{title}</Text>
      </Animated.Text>
      <TextInput
        value={value}
        style={[styles.textinput, { marginTop: moderateScaleVertical(isFieldActive && value ? 14 : 7) }]}
        underlineColorAndroid="transparent"
        autoCapitalize={autocapitalize ? 'characters' : 'none'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignSelf: 'center',
    width: '100%',
    height: moderateScaleVertical(55),
    marginVertical: moderateScaleVertical(5),
    backgroundColor: Color.White,
    borderRadius: moderateScale(8),
    marginTop: moderateScaleVertical(10),
  },
  textinput: {
    fontSize: textScale(13),
    marginTop: moderateScaleVertical(16),
    fontFamily: FontsFamily.Medium,
    color: Color.Black,
    paddingLeft: moderateScale(19),
  },
  titleStyles: {
    position: 'absolute',
    left: moderateScale(3),
    paddingLeft: moderateScale(16),
  },
});

export default MyTextInput;
