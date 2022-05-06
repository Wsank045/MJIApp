import React, {useState} from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet,Alert } from 'react-native';
import { View } from 'react-native';
import FormInputs from '../components/FormInputs';
import FormPicker from '../components/FormPicker';
import ValidButon from '../components/ValidButton';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { v4 as uuidv4 } from 'uuid';

import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const genderList = [
    {   label : "Homme",
        value : "Homme"},
    {
        label : "Femme",
        value : "Femme"
    }
];

const ageList = [
    {
        label : "moins de 18",
        value : "moins de 18"
    },
   {
       label : "18-25",
       value : "18-25"
   } ,
   {
       label : "25-30",
       value : "25-30",
   },
   {
       label : "35-40",
       value : "35-40",
   }
]




const AddKainosScreen = ({navigation}) => {


    const uid = uuidv4();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [date, setDate] = useState("");

    const kainosCollection = firestore().collection("Kainos");

    saveKainos = (mFirstname,mLastname,mEmail,mPhone,mCity,mGender,mAge,mDate) => {
        kainosCollection.doc(uid).set ({
            firstname : mFirstname,
            lastname : mLastname,
            email : mEmail,
            phone : mPhone,
            city : mCity,
            gender : mGender,
            age : mAge,
            date : mDate,
            formations : [],
            department : "",
            agent : "",
            mark : "",
            comments : "",
            uid : uid
        }).catch (err => {
            console.log(err)
                    Alert.alert (
                        "Erreur",
                        "L'ajout n'a pas été effectué correctement, veuillez vérifier les données entrées",
                        [ 
                            {
                                text : "OK",
                                onPress :() => console.log("Ok")
  
                            }
                        ]

                     )
        } )
    }



    return ( 
        <KeyboardAwareScrollView style = {styles.formContainer} extraHeight = {200} >
            <View style = {styles.InputsContainer}>
                <FormInputs style = {styles.textInput} placeholder = "Nom" onChangeText = {value => setLastname(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Prénom"onChangeText = {value => setFirstname(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Adresse courriel" keyboardType = "email-address" onChangeText = {value => setEmail(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Téléphone" keyboardType = "default" onChangeText = {value => setPhone(value)} />
                <FormInputs style = {styles.textInput} placeholder = "Ville" onChangeText = {value => setCity(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Date d'arrivée" onChangeText = {value => setDate(value)}/>
                <FormPicker data =  {genderList} title = "Sexe" style = {styles.textInput} getPickerValue = {value => setGender(value)}/>
                <FormPicker style = {styles.textInput} data = {ageList} title = "Tranche d'âge" getPickerValue = {value => setAge(value)}/>

                <View style = {styles.buttonContainer}>
                    <ValidButon title = "Ajouter" style = {styles.button} onPress = {() => {
                        if ( firstname === "" || lastname === "" || email === "" || phone === "" || gender === "") {
                            Alert.alert (
                                "Erreur",
                                "Les champs 'Nom', 'Prénom', 'Adresse courriel', 'Téléphone' et 'Sexe' sont requis",
                                [ 
                                    {
                                        text : "OK",
                                        onPress :() => console.log("Ok")
          
                                    }
                                ]
        
                             )
                        } else {
                            saveKainos(firstname,lastname,email,phone,city,gender,age,date)
                            Alert.alert (
                                "Ajout",
                                "Ajout effectué avec succès",
                                [ 
                                    {
                                        text : "OK",
                                        onPress :() => navigation.goBack()
          
                                    }
                                ]
        
                             )
                        }
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
     },
})
 
export default AddKainosScreen;