import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, PermissionsAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../styles/styles'
import { FontsFamily } from '../utility/util'
import MyTextInput from '../component/MyTextInput'
import ValidationCheck, { ValidationCheckFun, ValidationStyle } from '../helper/ValidationCheck'
import { moderateScale, moderateScaleVertical, scale } from '../helper/responsiveSize'
import CustomButton from '../component/CustomButton'
import { useSelector } from 'react-redux'
import { RadioButton } from 'react-native-radio-buttons-group'
import RedioButton from '../component/RedioButton'
import CheckBox from '../component/CheckBox'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { setUserData } from '../redux/action/UserDataAction'

type RegistationProps = {
    navigation: RegistationProps<any>;
};
const Registation: React.FC<RegistationProps> = ({ navigation }) => {
    const userData = useSelector((state: any) => state.UserData.data);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modal, setmodal] = useState(false);
    const [data, setData] = useState({
        EmailAddress: '',
        Password: '',
        Name:'',
        MobileNumber:'',
        Hobbies:'',
        Gender:'',
        ProfileImage:''
    })
    const [valid, setValid] = useState({
        EmailAddress: undefined,
        Password: undefined,
        Name:undefined,
        MobileNumber:undefined,
        Hobbies:undefined,
        Gender:undefined,
        ProfileImage:undefined
    })
    const handler = (v: any, i: string) => {
        setData(e => ({ ...e, [i]: v }));

    };
    const validhandler = (v: any, i: string) => {
        setValid(e => ({ ...e, [i]: v }));
    };
   

    const openImagePicker = () => {
      setmodal(false)

      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
  
      launchImageLibrary(options, handleResponse);
    };
  
    const handleCameraLaunch = async() => {
      setmodal(false)
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            launchCamera(options, handleResponse);
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
      };
    };
  
    const handleResponse = (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        handler(imageUri,'ProfileImage'),
        validhandler(true,'ProfileImage')
      }
    };

    const CheckAndContinue = () => {
     
      let Email = ValidationCheckFun(ValidationCheck.Email, data.EmailAddress)
      let Password = ValidationCheckFun(ValidationCheck.Password, data.Password)
      let Name = ValidationCheckFun(ValidationCheck.NameWithSpace, data.Name)
      let MobileNumber = ValidationCheckFun(ValidationCheck.MobileNumber, data.MobileNumber)
      let Hobbies = data?.Hobbies?.length>0
      let Gender= data?.Gender?.length>0
      let ProfileImage=data.ProfileImage?.length>0
      console.log(data.ProfileImage);
      
      if (Email && Password&&Name&&MobileNumber&&Hobbies&&Gender&&ProfileImage) {
        setUserData(data)

              navigation.navigate('Login')
      }
      else {
          Email
              ? validhandler(true, 'EmailAddress')
              : validhandler(false, 'EmailAddress')
          Password
              ? validhandler(true, 'Password')
              : validhandler(false, 'Password')
          Name
          ? validhandler(true, 'Name')
          : validhandler(false, 'Name')
          MobileNumber
          ? validhandler(true, 'MobileNumber')
          : validhandler(false, 'MobileNumber')
          Hobbies
          ? validhandler(true, 'Hobbies')
          : validhandler(false, 'Hobbies')
          Gender
          ? validhandler(true, 'Gender')
          : validhandler(false, 'Gender')
          ProfileImage
          ? validhandler(true, 'ProfileImage')
          : validhandler(false, 'ProfileImage')

      }
  }
    return (
        <View style={styles.MainView}>
          <Modal visible={modal} transparent>
           <Pressable onPress={()=>{
            setmodal(false)
           }} style={styles.ModalMain}>
            <View style={styles.ModalView}>
              <Pressable hitSlop={styles.hitSlop} onPress={handleCameraLaunch} style={styles.ButtonModal}>
                <Text>Camera</Text>
              </Pressable>
              <Pressable hitSlop={styles.hitSlop}  onPress={openImagePicker}style={styles.ButtonModal}>
                <Text>Gallary</Text>
              </Pressable>
            </View>

           </Pressable>
          </Modal>
            <View style={styles.BodyView}>
                <Text style={styles.HeaderTitle}>Registation</Text>
                <View>
              <MyTextInput
                editable={true}
                secureTextEntry={false}
                title='Name'
                value={data.Name}
                attrName="Name"
                error={
                  valid.Name == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.NameWithSpace, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'default'}
                maxLength={100}
              />
              {
                valid.Name == false && <Text style={ValidationStyle.ErrorText}>Enter valid Name</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                secureTextEntry={false}
                title='Mobile Number'
                value={data.MobileNumber}
                attrName="MobileNumber"
                error={
                  valid.MobileNumber == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.MobileNumber, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'numeric'}
                maxLength={10}
              />
              {
                valid.MobileNumber == false && <Text style={ValidationStyle.ErrorText}>Enter valid Mobile Number</Text>
              }
            </View>
            <View style={{marginTop:moderateScaleVertical(10)}}>
              <RedioButton onChangeRedio={(val)=>{handler(val,'Gender'),validhandler(val?.length>0?true:false,'Gender')}}/>
              {
                valid.Gender== false && <Text style={ValidationStyle.ErrorText}>Select Gender</Text>
             } 
            </View>
            <View style={{marginTop:moderateScaleVertical(10)}}>
              <CheckBox onChange={(val)=>{handler(val,'Hobbies'),validhandler(val?.length>0?true:false,'Hobbies')}}/>
              {
                valid.Hobbies== false && <Text style={ValidationStyle.ErrorText}>Select Hobbies</Text>
             } 
            </View>
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
                <TouchableOpacity style={styles.ImagePickerView} onPress={()=>{setmodal(true)}}>
                  <Text>Choose Image</Text>
                </TouchableOpacity>
               { selectedImage&&<Image source={{uri:selectedImage}} style={styles.SelectImage}/>}
                <View style={styles.ButtonView}>
                    <CustomButton
                        ButtonTitle='Registation'
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
    },
    ImagePickerView:{
      borderWidth:1,
      borderRadius:5,
      padding:moderateScale(7),
      alignSelf:'flex-start',
      marginTop:moderateScaleVertical(10)
    },
    ModalMain:{
      flex:1,
      backgroundColor:'rgba(0,0,0,.5)',
      alignItems:'center',
      justifyContent:"flex-end",
      width:'100%'
    },
    ModalView:{
      width:'100%',
      backgroundColor:Color.White,
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      padding:moderateScale(20)
    },
    ButtonModal:{
      marginTop:moderateScaleVertical(10)
    },
    hitSlop:{
      top:10,
      left:10,
      bottom:10,
      right:10
    },
   SelectImage:{
    height:moderateScaleVertical(100),
    width:moderateScale(100),
    marginTop:moderateScaleVertical(10),
    borderRadius:moderateScale(10)
  }

})
export default Registation
