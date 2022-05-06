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
import { QuerySnapshot } from '@google-cloud/firestore';
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


const RegistrationScreen = ({navigation}) => {

    

    


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [isAdmin,setIsAdmin] = useState();
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [confirmId,setConfirmId] = useState("");
    const [exist,setExists] = useState(false);
   


    const agentCollection = firestore().collection("Agents");

    const addAgent = async (mEmail,mPassword,mFirstname,mLastname,mPhone,mCity,mGender,mAge,mConfirmId) => {

       const checking = await firestore().collection("AddingAgent").doc(mConfirmId).get().then(
            documentSnapShot => {
                if(documentSnapShot.exists) {
                    setExists(true);
                    setIsAdmin(documentSnapShot.get('isAdmin'));
                } else {
                    alert(
                        "Veuillez vérifier votre numéro de confirmation"
                    )
                    console.log(mConfirmId)
                }});

        if(exist) {

            auth().createUserWithEmailAndPassword(mEmail,mPassword)
            .then(() => {
                        console.log('User account created & signed in!');
                        agentCollection.doc(auth().currentUser.uid).set ({
                            firstname : mFirstname,
                            lastname : mLastname,
                            email : mEmail,
                            phone : mPhone,
                            city : mCity,
                            gender : mGender,
                            age : mAge,
                            isAdmin : isAdmin,
                            formations : [],
                            department : "",
                            trackList : [],
                            uid : auth().currentUser.uid,
                            addingId : mConfirmId
                        }).catch (error => {console.log(error)})
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log("email already used")
                            Alert.alert (
                                "Erreur",
                                "Cet email a déjà été utilisé",
                                [ 
                                    {
                                        text : "OK",
                                        onPress :() => console.log("Ok")
        
                                    }
                                ]

                            )
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            Alert.alert (
                                "Erreur",
                                "Email invalide",
                                [ 
                                    {
                                        text : "OK",
                                        onPress :() => console.log("Ok")

                                    }
                                ]

                            )
                        }
                        console.error(error);
                    })

        }
        
                    
               
            }

    
    return ( 
        <KeyboardAwareScrollView style = {styles.formContainer} extraHeight = {200}>
            <View style = {styles.InputsContainer}>
                <FormInputs style = {styles.textInput} placeholder = "Nom" keyboardType = "default" onChangeText = {value => setLastname(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Prénom" onChangeText = {value => setFirstname(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Adresse courriel" keyboardType = "email-address" onChangeText = {value => setEmail(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Mot de passe" onChangeText = {value => setPassword(value)} />
                <FormInputs style = {styles.textInput} placeholder = "Confirmation du mot de passe"   onChangeText = {value => setConfirmPassword(value)} />
                <FormInputs style = {styles.textInput} placeholder = "Téléphone" keyboardType = "default" onChangeText = {value => setPhone(value)} />
                <FormInputs style = {styles.textInput} placeholder = "Ville" onChangeText = {value => setCity(value)}/>
                <FormPicker data = {genderList} title = "Sexe" style = {styles.textInput} getPickerValue = {value => setGender(value)}/>
                <FormPicker style = {styles.textInput} data = {ageList} title = "Tranche d'âge" getPickerValue = {value => setAge(value)}/>
                <FormInputs style = {styles.textInput} placeholder = "Numéro de confirmation" onChangeText = {value => setConfirmId(value)}/>

                <View style = {styles.buttonContainer}>
                    <ValidButon title = "S'enrégistrer" style = {styles.button} onPress = {() => {
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
                        }else if (confirmPassword !== password) {
                            Alert.alert (
                                "Erreur",
                                "Vos mot de passe ne coïncident pas !",
                                [ 
                                    {
                                        text : "OK",
                                        onPress :() => console.log("Ok")
          
                                    }
                                ]
        
                             )
                        } 
                        else {
                            addAgent(email,password,firstname,lastname,phone,city,gender,age,confirmId);
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
        margin : 10,
     },
})
 
export default RegistrationScreen;