import React, {useState,useContext} from 'react';
import{View,Text, Alert} from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet,Linking } from 'react-native';
import FormInputs from '../components/FormInputs';
import FormPicker from '../components/FormPicker';
import ValidButon from '../components/ValidButton';
import { windowHeight, windowWidth } from '../utils/Dimensions';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AuthStack from '../navigation/AuthStack';
import { AuthContext } from '../navigation/AuthProvider';
import { v4 as uuidv4} from 'uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';






const AddAgentScreen = ({navigation}) => {

    const [email,setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const addingId = uuidv4();

    const admin = [
        {
            label : "Oui",
            value : true,
        },
        {
            label : "Non",
            value : false,
        }
    ];

    

    const addingAgent = (addingId,email) => {
        firestore().collection("AddingAgent").doc(addingId).set({
            addingId : addingId,
            isAdmin : isAdmin,
            email : email,
        }).then(() => {
            alert(
                "Email envoyé avec succès !"
            );
            navigation.navigate("HomeScreen")
        }
           
        ).catch( e => {
            alert(
                "Une erreur s'est produite veuillez réessayer !"
            )
        }
           
        )
    }


   

    
    return ( 
        <KeyboardAwareScrollView style = {styles.formContainer}>
            <View style = {styles.InputsContainer}>
                <FormInputs style = {styles.textInput} placeholder = "Adresse courriel" keyboardType = "email-address" onChangeText = {value => setEmail(value)}/>
                <FormPicker style = {styles.textInput} data = {admin} title = "Administrateur" getPickerValue = {value => setIsAdmin(value)}/>

                <View style = {styles.buttonContainer}>
                    <ValidButon title = "Envoyer" style = {styles.button} onPress = {() => {
                        addingAgent(addingId,email)
                    }}/>
                    
                </View>
                
            </View>
            
        </KeyboardAwareScrollView>
     );
}

const styles = StyleSheet.create({

    formContainer : {
        flex :1,
        
        backgroundColor : "white"
    },

    InputsContainer : {
        marginTop : 20,
    },

    textInput : {
      marginHorizontal : 40,
      marginVertical : 10,
      height : 50,
      backgroundColor : "#e6e6e6",
      color : '#000',
      alignItems : "center",
      justifyContent : "center",
      padding : 10,
      borderRadius : 5,
      elevation : 3,
      shadowOffset : {width : 3, height : 3},
      shadowColor : "black",
      shadowRadius : 5,
    },

    buttonContainer : {
        marginVertical: 30,
        alignItems : "center",
    },

    button : {
        backgroundColor : "#F4B95A",
        borderRadius : 10,
        height : windowHeight/20,
        width : windowWidth/2,
        justifyContent : "center",
        alignItems : "center",
        margin : 10,
     },
})
 
export default AddAgentScreen;