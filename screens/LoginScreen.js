import React, { useState, useEffect,useContext } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity,ScrollView, View,Text,Button,StatusBar } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import FormInputs from '../components/FormInputs';
import ValidButton from '../components/ValidButton';
import { AuthContext } from '../navigation/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {login} = useContext(AuthContext)


      return (

      
        <KeyboardAwareScrollView  contentConatinerStyle = {styles.mainContainer } >
          <StatusBar barStyle="light-content"/>
          <View style = {{alignItems : "center"}}>
                <View style = {styles.imageContainer} >
                  <Image style = {styles.logo} source = {require('../Asset/log.png')}/>
                </View>
        
                
               
                  <View style = {styles.textInputContainer}>
                    <FormInputs placeholder = {"Adresse courriel"}  secure = {false}
                        labelValue = {email}
                        onChangeText = {(userEmail)=> setEmail(userEmail)}
                        style = {styles.textInput}/>
                    <FormInputs placeholder = {"Mot de passe"} secure = {true}
                        labelValue = {password}
                        onChangeText = {(userPassword)=> setPassword(userPassword)}
                        style = {styles.textInput}/>
                  </View>
              
                    
        
             
        
                <View >
                    <ValidButton title = {"Se Connecter"} style = {styles.buttonContainer} onPress = {() => login(email,password)}/>
                    <TouchableOpacity onPress = {()=>{
                        navigation.navigate("RegistrationScreen")
                    }}>
                        <Text style = {{color : "#2471ed", textAlign : "center",fontSize : 20}} > Créer un compte?</Text>
                    </TouchableOpacity>
                </View>

          </View>
          
  
        </KeyboardAwareScrollView>
        
      )

};


const styles = StyleSheet.create({
   mainContainer : {
    flex : 1,
    backgroundColor : "white",
    alignItems :"center",
   
   },

   /**Image container and Logo styling**/

   imageContainer : {
    justifyContent : "center",
    alignContent : "center",
    marginTop : 100,
    // marginVertical : 30,
   },

   logo : {
    height : 100,
    width : 100,
    resizeMode : "cover",
 },

 /**Text Input container and TextInput style */

  textInputContainer : {
      width : "100%",
      justifyContent : "center",
      alignContent :'center',
      marginTop : 50,

    },

    textInput : {
      marginHorizontal : 40,
      marginVertical : 10,
      height : windowHeight/20,
      backgroundColor : "#e6e6e6",
      alignItems : "center",
      justifyContent : "center",
      padding : 10,
      borderRadius : 5,
  },

  buttonContainer : {
    backgroundColor : "#F4B95A",
    borderRadius : 10,
    height : windowHeight/20,
    width : windowWidth/2,
    margin : 30,
    justifyContent : "center",
    alignItems : "center",
 },
   
 })

 export default LoginScreen;