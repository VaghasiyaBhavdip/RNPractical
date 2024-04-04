import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, moderateScaleVertical, scale } from '../helper/responsiveSize'
import { Color } from '../styles/styles'
import { useSelector } from 'react-redux'
import { FontsFamily } from '../utility/util'
const Deshbord = () => {
  const [Hobbies, setHobbies] = useState()
  const userData = useSelector((state: any) => state.UserData.data);
  useEffect(() => {
    const selectedHobbies = userData?.Hobbies
      .filter(hobby => hobby?.isSelect)
      .map(hobby => hobby?.label);

    // Convert the array of labels into a comma-separated string
    const hobbiesString = selectedHobbies?.join(', ');
    setHobbies(hobbiesString)

  }, [userData])
  console.log('Hobbies', Hobbies);

  console.log('userData', userData);
  return (
    <View style={styles.MianView}>
      <View style={styles.CardView}>
        {userData?.ProfileImage && <Image source={{ uri: userData?.ProfileImage }} style={styles.SelectImage} />}
        <Text style={styles.Lable}>{userData?.Name}</Text>
        <Text style={styles.Lable}>{userData?.EmailAddress}</Text>
        <Text style={styles.Lable}>{userData?.MobileNumber}</Text>

        <Text style={styles.Lable}>{userData?.Gender[0]?.label}</Text>
        <Text style={styles.Lable}>{Hobbies}</Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  MianView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20)
  },
  CardView: {
    padding: moderateScale(20),
    borderRadius: moderateScale(10),

    shadowColor: 'rgba(0,0,0,.3)',
    shadowRadius: moderateScale(10),
    backgroundColor: Color.White,
    elevation: 6,
    shadowOffset: { height: 2, width: 3 }
  },
  SelectImage: {
    height: moderateScaleVertical(200),
    width: moderateScale(200),
    marginTop: moderateScaleVertical(10),
    borderRadius: moderateScale(10)
  },
  Lable: {
    fontSize: scale(15),
    fontFamily: FontsFamily.SemiBold,
    color: Color.Black
  }

})
export default Deshbord