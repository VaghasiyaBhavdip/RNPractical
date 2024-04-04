import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../styles/styles'
import { FontsFamily } from '../utility/util'
import MyTextInput from '../component/MyTextInput'
import ValidationCheck, { ValidationCheckFun, ValidationStyle } from '../helper/ValidationCheck'
import { moderateScale, moderateScaleVertical, scale } from '../helper/responsiveSize'
import CustomButton from '../component/CustomButton'
import { useSelector } from 'react-redux'

type LoginProps = {
    navigation: LoginProps<any>;
};
const Login: React.FC<LoginProps> = ({ navigation }) => {
    const userData = useSelector((state: any) => state.UserData.data);

    const [data, setData] = useState({
        EmailAddress: '',
        Password: ''
    })
    const [valid, setValid] = useState({
        EmailAddress: undefined,
        Password: undefined
    })
    const handler = (v: any, i: string) => {
        setData(e => ({ ...e, [i]: v }));

    };
    const validhandler = (v: any, i: string) => {
        setValid(e => ({ ...e, [i]: v }));
    };
    const CheckAndContinue = () => {
        let Email = ValidationCheckFun(ValidationCheck.Email, data.EmailAddress)
        let Password = ValidationCheckFun(ValidationCheck.Password, data.Password)

        if (Email && Password) {
            if (userData?.EmailAddress == data.EmailAddress && userData?.Password === data.Password)
                navigation.navigate('Deshbord')
            else {
                Alert.alert('Email & Password Incoorect')
            }
        }
        else {
            Email
                ? validhandler(true, 'EmailAddress')
                : validhandler(false, 'EmailAddress')
            Password
                ? validhandler(true, 'Password')
                : validhandler(false, 'Password')

        }
    }
    return (
        <View style={styles.MainView}>

            <View style={styles.BodyView}>
                <Text style={styles.HeaderTitle}>Login</Text>
                <View>
                    <MyTextInput
                        editable={true}
                        secureTextEntry={false}
                        title='Email Address'
                        value={data.EmailAddress}
                        attrName="EmailAddress"
                        error={
                            valid.EmailAddress == false && ValidationStyle.ValidationTextBoxView
                        }
                        onChageText={(val, attr) => {
                            handler(val, attr)
                            validhandler(true, attr)
                        }}
                        onChageValidation={(val, attr) => {
                            ValidationCheckFun(ValidationCheck.Email, val) == true
                                ? validhandler(true, attr)
                                : validhandler(false, attr)
                        }}
                        RemoveText=''
                        autocapitalize={false}
                        keyboardType={'default'}
                        maxLength={100}
                    />
                    {
                        valid.EmailAddress == false && <Text style={ValidationStyle.ErrorText}>Enter valid Email Address</Text>
                    }
                </View>
                <View>
                    <MyTextInput
                        editable={true}
                        title='Password'
                        value={data.Password}
                        attrName="Password"
                        secureTextEntry={true}
                        error={
                            valid.Password == false && ValidationStyle.ValidationTextBoxView
                        }
                        onChageText={(val, attr) => {
                            handler(val, attr)
                            validhandler(true, attr)
                        }}
                        onChageValidation={(val, attr) => {
                            ValidationCheckFun(ValidationCheck.Password, val) == true
                                ? validhandler(true, attr)
                                : validhandler(false, attr)
                        }}
                        RemoveText=''
                        autocapitalize={false}
                        keyboardType={'default'}
                        maxLength={100}
                    />
                    {
                        valid.Password == false && <Text style={ValidationStyle.ErrorText}>Enter valid Password</Text>
                    }
                </View>
                <View style={styles.ButtonView}>
                    <CustomButton
                        ButtonTitle='Login'
                        Disable={false}
                        Onpress={() => {
                            CheckAndContinue()
                        }}
                    />

                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    MainView: {
        flex: 1
    },

    BodyView: {
        flex: 1,
        padding: moderateScale(20),
        justifyContent: "center"
    },
    HeaderTitle: {
        color: Color.Black,
        fontSize: scale(25),
        fontFamily: FontsFamily.Bold,
        alignSelf: 'center'
    },
    ButtonView: {
        marginTop: moderateScaleVertical(20)
    }
})
export default Login