import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { moderateScale, moderateScaleVertical } from '../helper/responsiveSize';

type CheckBoxProps = {
    onChange: (val: any) => void
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange = (val: any) => { } }) => {
    const [data, setData] = useState([
        { id: 1, label: 'Playing', isSelect: false },
        { id: 2, label: 'Singing', isSelect: false },
        { id: 3, label: 'Travelling', isSelect: false }
    ]);
    useEffect(() => {
        onChange(data?.filter((V) => V.isSelect == true))
    }, [data])
    const onPressCheckBox = (index: number) => {
        const newArray = data.map((v, i) => {
            if (i === index) {
                return { ...v, isSelect: !v.isSelect };
            } else {
                return v;
            }
        });
        setData(newArray);
    };

    return (
        <View style={styles.MainView}>
            {data.map((v, i) => (
                <Pressable key={v.id} style={styles.CheckBoxView} onPress={() => onPressCheckBox(i)}>
                    {v.isSelect
                        ? <Image resizeMode='contain' source={require('../assets/images/Check.png')} style={styles.Image} />
                        : <Image resizeMode='contain' source={require('../assets/images/EmptyCheck.png')} style={styles.Image} />}

                    <Text style={styles.LabelText}>{v.label}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    MainView: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-start'
    },
    Image: {
        height: moderateScaleVertical(25),
        width: moderateScale(25),
        alignSelf: 'center',
        marginLeft: moderateScale(5)
    },
    CheckBoxView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    LabelText: {
        marginLeft: moderateScale(10)
    }
});

export default CheckBox;
