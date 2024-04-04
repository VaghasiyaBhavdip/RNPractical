import { StyleSheet } from "react-native"
import { Color } from "../styles/styles"
import { moderateScale, textScale } from "./responsiveSize"
import { FontsFamily } from "../utility/util"

export const ValidationCheckFun = (regx: any, string: any) => {


    if (regx.test(string) == true) {
        return true
    }
    else {
        return false
    }
}

export const ValidationStyle = StyleSheet.create({
    ValidationTextBoxView: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: Color.White
    },
    ErrorText: {
        color: 'red',
        fontSize: textScale(13),
        fontFamily: FontsFamily.Medium,
        alignSelf: 'flex-start',
        marginLeft: moderateScale(10)
    }
})

export default {
    NameWithSpace: /^[a-zA-Z]{1,}( [a-zA-Z ]{1,})$/,
    MobileNumber: /^[0-9]{10}$/,
    License: /^[A-Z]{2}[0-9]{8}$/,
    Email: /^\w+([\.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/,
    Password:/^.{5,}$/

}