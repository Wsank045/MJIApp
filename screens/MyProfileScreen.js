import React, {useState,useContext,useEffect} from 'react';
import { Alert,TouchableOpacity } from 'react-native';
import { ScrollView ,StyleSheet,View,Image,Text} from 'react-native';
import EditableText from '../components/EditableText';
import { AuthContext } from '../navigation/AuthProvider';
import firestore, { firebase } from '@react-native-firebase/firestore';
import ValidButton from '../components/ValidButton';
import { ActivityIndicator } from 'react-native';
import { Modal } from 'react-native';
import FormationArea from '../components/FormationArea';
import FormInputs from '../components/FormInputs';
import FormPicker from '../components/FormPicker';

import auth from '@react-native-firebase/auth';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';





const MyProfileScreen = () => {

    const {user} = useContext(AuthContext);
    const userUid = user.uid;

    const [myData,setMyData] = useState({});
    const[loading,setLoading] = useState(true);
    const [visibility,setVisibility] = useState(false);

    //User Data values
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [gender,setGender] = useState("");
    const [isAdmin,setIsAdmin] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [city,setCity] = useState("");
    const [age,setAge] = useState("");
    const [department,setDepartment] = useState("");
    const [formations,setFormations] = useState([])

    const fecthData = async () => {
        try {
            await firestore().collection("Agents").doc(userUid).get().then(
                documentSnapshot => {
                    setMyData(documentSnapshot.data());
                    setLoading(false);
                }
            )
        } catch (error) {
            
        }
    }
    useEffect (() => {
        fecthData();
        if(!loading) {
            setFirstname (myData.firstname) ;
            setLastname(myData.lastname);
            setGender(myData.gender);
            setIsAdmin(myData.isAdmin);
            setEmail(myData.email);
            setPhone(myData.phone);
            setCity(myData.city);
            setAge(myData.age);
            setDepartment(myData.department);
            setFormations(myData.formations);
            
        }

    },[loading]);

    //Visibilty
    //Picker or Input
    const [input,setInput] = useState (true)
    // Comment Input
    const [commentInput,setCommentInput] = useState(false);


    

    const [target,setTarget] = useState ("");

    //editValues
    const [editEmail,setEditEmail] = useState();
    const [editPassword,setEditPassWord] = useState();
    const [editPhone,setEditPhone] = useState();
    const [editCity,setEditCity] = useState();
    const [editAge,setEditAge] = useState();
    const [editDepartment,setEditDepartment] = useState();
    const [editFormation,setEditFormation] = useState([]);
    const [secure,setSecure] = useState(false);

    const [overlayVisible,setOverlayVisible] = useState(false);


   

    //Picker Data

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

    
    const formationList = [
       {
           value : "Formation 001",
           label : "Formation 001",
           key : "Formation 001",
       },
       {
           value : "Formation 101",
           label : "Formation 101",
           key : "Formation 101"
       },
       {
           value : "Formation 201",
           label: "Formation 201",
           key : "Formation 201"
       },
       {
            value : "Poïmaino",
            label : "Poïmaino",
            key : "Poïmaino"
       },
       {
           value : "IEBI",
           label : "IEBI",
           key : "IEBI"
       },
       {
           value : "Piliers",
           label : "Piliers",
           key : "Piliers"
       }
    ]

   

   
    const [pickerTitle,setPickerTitle] = useState ("");
    const [pickerData,setPickerData] = useState([]);

    const [currentPassword,setCurrentPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();

    reauthenticatePassword = (currentPassword)=> {
        var cred = firebase.auth.EmailAuthProvider.credential(user.email,currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    const onChangePasswordPress = () => {
        
        reauthenticatePassword(currentPassword).then (() => {

            user.updatePassword(newPassword).then (() => {
                alert("Mot de passe mis à jour !");
            }).catch ((e) => {
                alert(e.message)
            })

        }).catch((e) => {
            alert(e.message)
        })
       
    }
    

    const pickerGetValue = (value) => {
        if(target === "Age") {
            setEditAge(value)
        } 
        else if (target === "Formations") {
            setEditFormation(value)
        }
    }


    const update = () => {
        firestore().collection("Agents").doc(userUid).update ({
            email : email,
            phone : phone,
            city : city,
            age : age,
            department : department,
            formations : formations,
        }
        ).catch(e => console.log(e, " from saving"))
    }
  


    return ( 
        <ScrollView style = {styles.container}>

        {(loading) ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) :
                (
                <View>
                     <Modal animationType = "slide" transparent = {true} visible = {visibility} onRequestClose = {() =>{setVisibility(!visibility)}}>
                            <View style = {styles.modalContainer}>
                                <View style = {styles.modalView}>

                                {input ? ( <FormInputs placeholder = {"Information"}  secure = {secure}
                                style = {commentInput ? styles.commentInput : styles.textInput} multiline = {true} defaultValue = {commentInput? comments : "" }
                                onChangeText = {value => {
                                    if (target === "Email") {
                                        setEditEmail(value)
                                    } else if (target === "Phone") {
                                        setEditPhone(value)
                                    } else if (target === "City") {
                                        setEditCity(value)
                                    } else if (target === "Department") {
                                        setEditDepartment(value)
                                    } else if (target === "Mark") {
                                        setEditMark(value)
                                    }  else if (target === "Password") {
                                        setEditPassWord(value)
                                    }
                                }}
                        />) : (
                            <FormPicker data = {pickerData} title = {pickerTitle} style = {styles.textInput} getPickerValue = {(value) => pickerGetValue(value)}/>
                        )}
                                
                        <View style = {styles.modalButtonContainer}>
                            <ValidButton title = "Modifier" style = {styles.modalButtonValid} onPress = {() => {

                                    setVisibility(false)
                                    if(target == "Email") {
                                        setEmail(editEmail)
                                    } else if (target === "Phone") {
                                        setPhone(editPhone)
                                    } else if (target === "City") {
                                        setCity(editCity)
                                    } else if (target === "Department") {
                                        setDepartment(editDepartment)
                                      
                                    } else if (target === "Mark") {
                                        setMark(editMark)
                                     
                                    } else if (target === "Password") {
                                        setPassword(editPassword)
                                    }
                                    
                                    else if (target === "Age") {
                                        setAge(editAge)
                                      
                                    } else if (target === "Formations") {
                                        const newFormation = {
                                            value : editFormation,
                                            label : editFormation,
                                            key : editFormation
                                        }
    
                                        var contains = false
    
                                        for (var i = 0 ; i<formations.length; i++) {
                                            if(formations[i].value === newFormation.value){
                                                contains = true
                                                console.log(contains)
                                                break;
                                            } 
                                        }
                                        if(!contains) {
                                            formations.push(newFormation)
                                        }
                                    }
    
                                }}/>
                            <ValidButton title = "Annuler" style = {styles.modalButtonCancel} onPress = {() => {setVisibility(false)}}/>
                                </View>
                            </View>         
                            </View>
                     </Modal >

                     <View>
                        <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
                            <View style = {{justifyContent : "center",alignItems : "center",padding : 20}}>
                                <FormInputs placeholder = "Mot de passe actuel" style = {styles.textInput} onChangeText = {(value) => {setCurrentPassword(value)}} secure = {true}/>
                                <FormInputs placeholder = "Nouveau mot de passe" style = {styles.textInput} onChangeText = {(value) => {setNewPassword(value)}} secure = {true}/>
                                <FormInputs placeholder = "Confirmer le mot de passe" style = {styles.textInput} onChangeText = {(value) => {setConfirmPassword(value)}} secure = {true}/>
                                <View style = {{flexDirection : "row"}}>
                                    <ValidButton title = "Confirmer" style = {styles.modalButtonValid} onPress = {() => {
                                        if(newPassword === confirmPassword) {
                                            onChangePasswordPress();
                                            setOverlayVisible(false)
                                        } else {
                                            alert("Les mots de passe ne coincident pas ! Veuillez réessayer")
                                        }
                                    }}/>
                                    <ValidButton title = "Annuler" style = {styles.modalButtonCancel} onPress = {() => setOverlayVisible(false)}/>
                                </View>
                                

                            </View>
                                
                        </Overlay>
                     </View>
                    



                    <View style = {styles.profileHeader}>
                      <View style = {styles.profilePictureContainer}>
      
                          <TouchableOpacity>
                              <Image source = {require("../Asset/Icon/man.png")} style = {styles.profileImg} />
                          </TouchableOpacity>
      
                      </View>
                      <TouchableOpacity style = {{margin : 10}} onPress = {() => setOverlayVisible(true)}>
                         <Text style = {{color : "#2D679D", fontSize : 18}}>Changer le mot de passe </Text>
                      </TouchableOpacity>  
                      <Text style = {styles.headerName}>{firstname + " " + lastname}</Text>
                      <Text style = {styles.headerSubText}>{gender}</Text>
                      <Text style = {styles.headerSubText}>{(isAdmin) ? "Administrateur" : "Pas Administrateur"}</Text>
      
                      
                    </View>
        
                    <EditableText title = "Adresse courriel"  content = {email} onPress = {()=>{
                        setInput(true)
                        setTarget("Email")
                        setSecure(false)
                        setVisibility(true)
                    }}/>
                    {/* <EditableText title = "Mot de passe"  content = "******** "onPress = {()=>{
                        setInput(true)
                        setTarget("Password")
                        setSecure(true)
                        setVisibility(true)
                        
                    }} secure /> */}
                    <EditableText title = "Téléphone"  content = {phone} onPress = {()=>{
                        setInput(true)
                        setTarget("Phone")
                        setSecure(false)
                        setVisibility(true)
                    }}/>
                    <EditableText title = "Ville"  content = {city}onPress = {()=>{
                         setInput(true)
                         setTarget("City")
                         setSecure(false)
                         setVisibility(true)
                    }}/>
                    <EditableText title = "Tranche d'âge"  content = {age} onPress = {()=>{
                         setPickerTitle ("Tranche d'âge");
                         setPickerData (ageList);
                         setInput(false)
                         setTarget("Age")
                         setSecure(false)
                         setVisibility(true)
                    }}/>
                    <EditableText title = "Département"  content = {department} onPress = {()=>{
                        setInput(true)
                        setTarget("Department")
                        setSecure(false)
                        setVisibility(true)
                    }}/>
                    <FormationArea formations = {formations} buttonVisible = {true} onPress = {() => {
                        setPickerTitle ("Ajouter une formation");
                        setPickerData (formationList);
                        setInput(false)
                        setSecure(false)
                        setTarget("Formations")
                        setVisibility(true)
                    }} /> 
                
                    <View style = {{alignItems : "center"}}>
                        <ValidButton title = "Soumettre les changements" style = {styles.submitButton} onPress = {()=>{
                            Alert.alert(
                                "Soumission",
                                "Êtes - vous sûr(e) de vouloir soumettre ces changements ?",
                                [
                                    {
                                        text : "Soumettre",
                                        onPress : update()
                                    },
                                    {
                                        text : "Annuler",
                                        onPress : () => console.log("Annulé")
                                    }
                                ]
                            )
                        }} />
                    </View>
                    

               

                </View>
                       
                )}

        </ScrollView>

     );
}

const styles = StyleSheet.create ( {

    container : {
        flex : 1,
    },

    //Header Picture

    profileHeader : {
        alignItems : "center",
    },

    profilePictureContainer : {
        marginTop : 20,
        height : 100,
        width : 100,
        backgroundColor : "#2D679D",
        borderRadius : 100,
        alignItems : "center",
        justifyContent : "center",
        borderWidth : 2,
        borderColor : "#1EE3B3"
    },

   

    profileImg : {
        height : 50,
        width : 50,
        resizeMode : "cover",
    },

    //HeaderText

    headerName : {
        fontSize : 20,
        fontWeight : "bold",
        margin : 10,
    },

    headerSubText : {
        fontSize : 15,
        fontWeight : "200",
        margin : 5,
    },

   
    submitButton : {
        backgroundColor : "#F4B95A",
        borderRadius : 10,
        height : 60,
        width : 327,
        marginVertical : 20,
        marginHorizontal : 30,
        justifyContent : "center",
        alignItems : "center",
    },

    modalButtonContainer : {
        //flex : 1,
        flexDirection : "row"
    },

    modalContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },

    textInput : {
        //marginHorizontal : 10,
        marginVertical : 10,
        //height : windowHeight/20
        width : 250,
        backgroundColor : "#e6e6e6",
        alignItems : "center",
        justifyContent : "center",
        padding : 10,
        borderRadius : 5,
    },
    modalButtonValid : {
        backgroundColor : "#F4B95A",
        margin : 8,
        borderRadius : 5,
        padding : 10,

    },

    modalButtonCancel : {
        backgroundColor : "#7A2F5B",
        margin : 8,
        borderRadius : 5,
        padding : 10,
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },



})
 
export default MyProfileScreen;