import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, scale, textScale, width } from '../helper/responsiveSize'
import { Color } from '../styles/styles'
import { FontsFamily } from '../utility/util'

interface CloseButtonProps{
    ButtonTitle:string,
    Disable:boolean
    Onpress:()=>void
}
const CustomButton :React.FC<CloseButtonProps>=({ButtonTitle,Disable,Onpress=()=>{}}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.ButtonStyle,{backgroundColor:Disable?Color.DisableBtn:Color.EnableBtn}]}
        disabled={Disable}
        onPress={Onpress}
        >
            <Text style={styles.ButtonText}>{ButtonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
      alignSelf:'center',
        width:'100%',
        marginBottom:moderateScaleVertical(15)
    },
    ButtonStyle:{
        borderRadius:moderateScale(10),
        borderColor:Color.Border,
        width:'100%',
        paddingVertical:moderateScaleVertical(14),
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonText:{
        fontSize:textScale(16),
        color:Color.White,
        fontFamily:FontsFamily.SemiBold
    }
})

export default CustomButton