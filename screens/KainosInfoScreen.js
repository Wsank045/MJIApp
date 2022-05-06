import React from 'react'
import { Alert,  Dimensions,  TouchableOpacity } from 'react-native';
import { ScrollView ,StyleSheet,View,Image,Text} from 'react-native';
import EditableText from '../components/EditableText';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import ValidButton from '../components/ValidButton';
import firestore from '@react-native-firebase/firestore';
import { useState,useEffect } from 'react';
import { Modal } from 'react-native';
import FormInputs from '../components/FormInputs';
import FormPicker from '../components/FormPicker';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { ActivityIndicator } from 'react-native';
import FormationArea from '../components/FormationArea';






// Comments area

const CommentArea = ({content,onPress}) => {
    return(
        <View style = {styles.commentContainer}>
            <Text style = {styles.commentTitle}>Commentaires</Text>
            <View style = {styles.commentContentContainer}>
                <Text style =  {styles.commentContent}>{content}</Text>
                <FAB style = {styles.fab}
                    icon = {
                        <Icon name  = "comment" type = "font-awesome5" color = "#fff"/>
                    }
                    color = "#2D679D"
                    size = "large"
                    onPress = {onPress}/>
                

            </View>
            

        </View>
    )
}





/**
 * Main View
 * @param  route navigation 
 * @returns View
 */
const KainosInfoScreen = ({route,navigation}) => {

    // Kainos initial data from previous view
    const {id} = route.params;
    const {user} = useContext(AuthContext);
    const  userUid = user.uid;

    const [kainos,setKainos] = useState();
    const [agentList,setAgentList] = useState([]);
    const [agentNamesList,setAgentNamesList] = useState([]);
    const [loadingKainos,setLoadingKainos] = useState(true);
    const [loadingAgent,setLoadingAgent] = useState(true);
    const [userAdmin,setUserAdmin] = useState(false);
    const [loadingUser,setLoadingUser] = useState(true);



    const fetchKainosData = async () => {
        try { await firestore().collection("Kainos").doc(id)
                        .get().then(
                            documnetSnapshot => {
                                setKainos (documnetSnapshot.data())
                                setLoadingKainos(false)
                                
                            }
                        )
                } catch(e){
                 console.log("from fetching kainos data: ",e)
                }
    }
    const fetchUserData = async () => {
        try {
            await firestore().collection("Agents").doc(userUid).get().then(
                documentSnapshot => {
                    setUserAdmin (documentSnapshot.data().isAdmin),
                    setLoadingUser(false)
                }
            )
        } catch (error) {
            
        }
    }

    const fetchAgentData = async (isSubscribed) => {
        try {firestore().collection("Agents").onSnapshot(
            
            (querySnapshot) => {

                const mAgents = [];
                const mAgentName = [];

                querySnapshot.forEach (documnetSnapshot => {
                    mAgents.push ({
                        label : documnetSnapshot.data().firstname + " " + documnetSnapshot.data().lastname,
                        value : documnetSnapshot.data().firstname + " " + documnetSnapshot.data().lastname,
                        key : documnetSnapshot.id,
                        
                    })
                    mAgentName.push(
                        documnetSnapshot.data().firstname + " " + documnetSnapshot.data().lastname
                    )
                });

                if (isSubscribed) {
                    setAgentList(mAgents);
                    setAgentNamesList(mAgentName);
                    setLoadingAgent(false)
                }
          });
        } catch (e) {
            if(isSubscribed) {
                console.log("From fetching agents: ",e)
            }
            
        }
    }

      //User data, user Id
      
  
      //Values
  
      const [firstname, setFirstname] = useState("");
      const [lastname, setLastname] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [city, setCity] = useState("");
      const [gender, setGender] = useState("");
      const [age, setAge] = useState("");
      const [date, setDate] = useState("");
      const [department,setDepartment] = useState("");
      const [agent,setAgent] = useState({});
      const [mark, setMark] = useState("");
      const [formations,setFormations] = useState([]);
      const [comments,setComments] = useState("");
      const [uid,setUid] =useState("");
      const [oldAgent,setOldAgent] = useState({});

    // Values initializing
    
   useEffect (()=> {
    let isSubscribed = true
    fetchKainosData();
    fetchAgentData(isSubscribed);
    fetchUserData();
    if (!loadingKainos) {
        setFirstname(kainos.firstname);
        setLastname(kainos.lastname);
        setEmail(kainos.email);
        setPhone(kainos.phone);
        setCity(kainos.city);
        setGender(kainos.gender);
        setAge(kainos.age);
        setDate(kainos.date);
        setDepartment(kainos.department);
        setAgent(kainos.agent);
        setMark(kainos.mark);
        setFormations(kainos.formations);
        setComments(kainos.comments);
        setUid(id);
        setOldAgent(kainos.agent)

    }else {
        return (
            <View style = {styles.loadingContainer}>
                <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
            </View>
        )
    }

    return () => (isSubscribed = false)
   },[loadingKainos,loadingAgent])

   



    //Visibilty
    //Picker or Input
    const [input,setInput] = useState (true)
    const [visibility,setVisibility] = useState (false);
    // Comment Input
    const [commentInput,setCommentInput] = useState(false);


    

    const [target,setTarget] = useState ("");

    //editValues
    const [editEmail,setEditEmail] = useState();
    const [editPhone,setEditPhone] = useState();
    const [editCity,setEditCity] = useState();
    const [editAge,setEditAge] = useState();
    const [editDepartment,setEditDepartment] = useState();
    const [editAgent,setEditAgent] = useState("");
    const [editMark,setEditMark] = useState();
    const [editComment,setEditComment] = useState();
    const [agentEditId, setAgentEditId] = useState("");
    const [editFormation,setEditFormation] = useState([]);


   

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

    const markList = [
        {
            label : "0",
            value : "0",
        },
        {
            label : "1",
            value : "1",
        },
        {
            label : "2",
            value : "2",
        },
        {
            label : "3",
            value : "3",
        },
        {
            label : "4",
            value : "4",
        },
        {
            label : "5",
            value : "5"
        }
    ];

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
    

    const pickerGetValue = (value) => {
        if(target === "Age") {
            setEditAge(value)
        } else if (target === "Agent") {
            setEditAgent(value)
            const index = agentNamesList.indexOf(value);
            if(index !== -1) {
                setAgentEditId (agentList[index].key);
                
            }

        } else if (target === "Mark") {
            setEditMark(value)
        } else if (target === "Formations") {
            setEditFormation(value)
        }
    }

   



     //Update data on FireStore

     const update = () => {

         firestore().collection("Kainos").doc(uid).set ({
             firstname : firstname,
             lastname : lastname,
             email : email,
             phone : phone,
             city : city,
             gender : gender,
             age : age,
             date : date,
             department : department,
             agent: agent,
             mark : mark,
             formations : formations,
             comments : comments,
             uid : uid,
             
         }
         ).catch(e => console.log(e, " from saving"))
         .then( () =>{
             if (kainos.agent !== {}) {

                firestore().collection("Agents").doc(oldAgent.agentId).update({
                    trackList : firestore.FieldValue.arrayRemove({uid: uid, fullName : firstname + " " + lastname})
                    
                }).catch(e => console.log(e," from deleting agent"))
                
             }
         }).catch(e => console.log(e)).then(
            firestore().collection("Agents").doc(agent.agentId).update({
                trackList : firestore.FieldValue.arrayUnion({uid: uid, fullName : firstname + " " + lastname})
            }).catch(e => console.log(e, " from adding to agent"))
         ).catch(e => {
            Alert.alert(
                "Erreur",
                "Une erreur s'es produite",
                [
                    {
                        text:"OK",
                        onPress : () => console.log("FROM UPDTATE " ,e.message)
                    }
                ]
            )
         }
            
         ).then(
            Alert.alert (
                "Soumission",
                "Vos modifications ont été soumises avec succès",
                [ 
                    {
                        text : "OK",

                    }
                ]

             )
         )
         setOldAgent(agent)

     }
    


     //Delete From FireStore 

     const deleteKainos = () => {
            firestore().collection("Kainos").doc(uid).delete().then( () =>
                navigation.goBack()
            ).then(
                () =>{
                    if (kainos.agent !== {}) {
       
                       firestore().collection("Agents").doc(agent.agentId).update({
                           trackList : firestore.FieldValue.arrayRemove({uid: uid, fullName : firstname + " " + lastname})
                           
                       }).catch(e => console.log(e," from deleting agent"))
                       
                    }
                }
            ).catch (e => {
                Alert.alert(
                    "Erreur",
                    "Une erreur s'es produite",
                    [
                        {
                            text:"OK",
                            onPress : () => console.log(e)
                        }
                    ]
                )
            })
     }

     const [defaultValue,setDefaultValue] = useState("");

     const editDefaultValue = () => {
         if(target === "Email") {
             setDefaultValue( email);
         }
         else if(target === "Phone") {
            setDefaultValue (phone);
         }
         else if(target === "City") {
            setDefaultValue (city);
         }
         else if (target === "Department") {
            setDefaultValue (department);
         } else if (target === "Comment") {
            setDefaultValue (comments);
         }
     }

    

    


    return ( 
        
        <ScrollView style = {styles.container}>

            {(loadingKainos || loadingAgent || loadingUser) ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) : 
                 
            (
            <View>
                <Modal animationType = "slide" transparent = {true} visible = {visibility} onRequestClose = {() =>{setVisibility(!visibility)}}>
                <View style = {styles.modalContainer}>
                    <View style = {styles.modalView}>

                        {input ? ( <FormInputs placeholder = {"Information"}  secure = {false}
                                style = {commentInput ? styles.commentInput : styles.textInput} multiline = {true} defaultValue = {commentInput ? comments :defaultValue}
                                onChangeText = {value => {
                                    if (target === "Email") {
                                        setEditEmail(value)
                                    } else if (target === "Phone") {
                                        setEditPhone(value)
                                    } else if (target === "City") {
                                        setEditCity(value)
                                    } else if (target === "Department") {
                                        setEditDepartment(value)
                                    } 
                                    else if (target === "Comment") {
                                        setEditComment(value)
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
                                 
                                } else if (target === "Age") {
                                    setAge(editAge)
                                  
                                } else if (target === "Agent") {
                                    setAgent({
                                        fullName : editAgent,
                                        agentId : agentEditId
                                    })
                                    
                                   
                                } else if(target === "Comment") {
                                    setComments(editComment)
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


                                    
                                   
                                    //setFormations(newFormation);
                                }
      
                            } }/>
                            <ValidButton title = "Annuler" style = {styles.modalButtonCancel} onPress = {() => {setVisibility(false); setCommentInput(false)}}/>
                        </View>
                    </View>         
                </View>
            </Modal >

         
            <View style = {styles.profileHeader}>
                <View style = {styles.profilePictureContainer}>

                    <TouchableOpacity>
                        <Image source = {require("../Asset/Icon/man.png")} style = {styles.profileImg} />
                    </TouchableOpacity>

                </View>

                <Text style = {styles.headerName}>{firstname + " " +  lastname}</Text>
                <Text style = {styles.headerSubText}>{gender}</Text>
                <Text style = {styles.headerSubText}>Date d'arrivée : {date}</Text>

                
            </View>

            
            <EditableText title = "Adresse courriel"  content = {email} onPress = {
                ()=> {
                setInput(true)
                setTarget("Email")
                setVisibility(true)
                
                }}/>
            <EditableText title = "Téléphone"  content = {phone} onPress = {()=> {
                setInput(true)
                setTarget("Phone")
                setVisibility(true)} }/>
            <EditableText title = "Ville"  content = {city} onPress = {()=>{
                setInput(true)
                setTarget("City")
                setVisibility(true)
            }}/>
            <EditableText title = "Tranche d'âge"  content = {age} onPress = {()=>{
                setPickerTitle ("Tranche d'âge");
                setPickerData (ageList);
                setInput(false)
                setTarget("Age")
                setVisibility(true)
            }}/>
            <EditableText title = "Département"  content = {department} onPress = {()=>{
                setInput(true)
                setTarget("Department")
                setVisibility(true)
            }}/>
            <EditableText title = "Tuteur actuel"  content = {agent.fullName} onPress = {()=>{
                setPickerTitle ("Agent");
                setPickerData (agentList);
                setInput(false)
                setTarget("Agent")
                setVisibility(true)
            }}/>
            <EditableText title = "Note d'intégration"  content = {mark} onPress = {()=>{
                setPickerTitle ("Note d'intégration");
                setPickerData (markList);
                setInput(false)
                setTarget("Mark")
                setVisibility(true)
            }}/>
            {/* <FormationCheckBox disabled = {true} formations = {formations} getFormations = {(value) => {
                handleFormation(value);
            }}/> */}
            
                   
            <FormationArea formations = {formations} buttonVisible = {true} onPress = {() => {
                setPickerTitle ("Ajouter une formation");
                setPickerData (formationList);
                setInput(false)
                setTarget("Formations")
                setVisibility(true)
            }}/>    
               

            <CommentArea  content = {comments} onPress = {() => {
                setInput(true)
                setTarget("Comment")
                setCommentInput(true)
                setVisibility(true)
            }} />
            <View style = {{alignItems : "center"}}>
            <ValidButton title = "Supprimer ce Kainos" style = {styles.deleteButton} onPress = {()=>{
                if(userAdmin) {
                    Alert.alert(
                        "Suppression de Kainos",
                        "Voulez-vous supprimer ce Kainos de la liste",
                        [
                            {
                                text : "Supprimer",
                                onPress :() => deleteKainos()
        
                            },
                            {
                                text : "Annuler",
                            }
    
                        ]
                    )
                } else alert("Seuls les administrateurs ont accès à cette fonctionnalité");
               
               

                
                
            }}/>
            <ValidButton title = "Soumettre les changements" style = {styles.submitButton} onPress = {()=>{
                Alert.alert(
                    "Soumission des modifications",
                    "Voulez-vous soumettre ces changements",
                    [
                        {
                            text : "Soumettre",
                            onPress :() => update()
    
                        },
                        {
                            text : "Annuler",
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

    loadingContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
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

    //CommentArea 

    commentContainer : {
        marginHorizontal : 20,
        marginVertical : 20,
        backgroundColor : "#e6e6e6",
        padding : 15,
        borderRadius : 10,
        flexDirection : "column",
        shadowOpacity : 0.3,
        shadowColor : "grey",
        shadowOffset : {width : 1, height : 1},
        shadowRadius : 10,
    },

    commentTitle : {
        fontSize : 15,
        fontWeight : "500",
        margin : 2,
    },
    commentAuthor : {
        fontSize : 12,
        fontWeight : "400",
        margin : 15,
    },
    commentContentContainer : {
        margin : 5,
        marginBottom : 10,
    },
    commentContent : {
        paddingLeft : 15,
        fontSize : 15,
        fontWeight : "300",
    },

    fab : {
        paddingTop : 40,

    },

    
    //Button 

    deleteButton : {
        backgroundColor : "#7A2F5B",
        borderRadius : 10,
        height : 60,
        width : 327,
        margin : 30,
        justifyContent : "center",
        alignItems : "center",
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

    //Modal View

    modalContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
       
    },

    textInput : {
        //marginHorizontal : 10,
        marginVertical : 10,
        height : 40,
        width : 250,
        backgroundColor : "#e6e6e6",
        alignItems : "center",
        justifyContent : "center",
        padding : 10,
        borderRadius : 5,
    },

    commentInput : {
        marginVertical : 2,
        width : 300,
        backgroundColor : "#e6e6e6",

        padding : 10,
        borderRadius : 5,
        height : 300

    },

    modalButtonContainer : {
        //flex : 1,
        flexDirection : "row"
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
 
export default KainosInfoScreen;