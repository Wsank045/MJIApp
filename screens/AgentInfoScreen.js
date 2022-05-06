import React from 'react'
import { Alert,  TouchableOpacity } from 'react-native';
import { ScrollView ,StyleSheet,View,Image,Text} from 'react-native';
import EditableText from '../components/EditableText';
import { Button, FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import ValidButton from '../components/ValidButton';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useState,useEffect } from 'react';
import { Modal } from 'react-native';
import FormInputs from '../components/FormInputs';
import FormPicker from '../components/FormPicker';
import { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import FormationArea from '../components/FormationArea';
import NoneEditableText from '../components/NoneEditableText';
import { AuthContext } from '../navigation/AuthProvider';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Switch } from 'react-native-elements/dist/switch/switch';
import { color } from 'react-native-elements/dist/helpers';

const TrackListCard = ({name}) => {
    return(
        
            <TouchableOpacity>
                <View style = {styles.trackCardContainer}>
                    <Text>{name}</Text>
                </View>
            </TouchableOpacity>
       
    )
}


const TrackListArea = ({data,onPress}) => {
    return(
        <View style = {styles.trackListContainer}>
            <Text style = {styles.TrackListTitle}>Liste des personnes affectées</Text>

            <View style = {styles.TrackListContentContainer}>
                <Text style =  {styles.TrackListContent}></Text>
                {data.map((item) => {
                    return (
                        <View key = {item.uid}>
                            <TrackListCard name = {item.fullName}/>
                        </View>
                    )
                })}
                <FAB style = {styles.fab}
                    icon = {
                        <Icon name  = "plus" type = "font-awesome" color = "#fff"/>
                    }
                    color = "#2D679D"
                    size = "large"
                    onPress = {onPress}/>
                

            </View>
            

        </View>
    )
}



const AgentInfoScreen = ({navigation,route}) => {

    const {id} = route.params;
    const {user} = useContext(AuthContext);
    userUid = user.uid;

    const [agent,setAgent] = useState();
    const [kainosList,setKainosList] = useState();
    const [kainosNamesList,setKainosNamesLits] = useState([]);
    const [loadingKainos,setLoadingKainos] = useState(true);
    const [loadingAgent,setLoadingAgent] = useState(true);
    const [userAdmin,setUserAdmin] = useState(false);
    const [loadingUser,setLoadingUser] = useState(true);
    
    const fetchAgentData = async() => {
        try {
            await firestore().collection("Agents").doc(id)
                        .get().then(
                            documnetSnapshot => {
                                setAgent (documnetSnapshot.data())
                                setLoadingAgent(false)
                                
                    }
            )

        } catch (e) {
            console.log("from fetching agent data: ",e)
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

    const fetchKainosData = async (isSubscribed) => {
        try {
            await firestore().collection("Kainos").onSnapshot(
            
                (querySnapshot) => {
    
                    const mKainos = [];
                    const mKainosNames = [];
    
                    querySnapshot.forEach (documnetSnapshot => {
                        mKainos.push ({
                            label : documnetSnapshot.data().firstname + " " + documnetSnapshot.data().lastname,
                            value : documnetSnapshot.data().firstname + " " + documnetSnapshot.data().lastname,
                            key : documnetSnapshot.id,
                            
                        })
                        mKainosNames.push(
                            documnetSnapshot.data().firstname + " " + documnetSnapshot.data().lastname
                        )
                    });
                    if(isSubscribed) {
                        setKainosList(mKainos);
                        setKainosNamesLits(mKainosNames);
                        setLoadingKainos(false)
                    }
                    
                   
              });
        } catch (e) {
            if(isSubscribed){
                console.log("From fetching kainos: ",e)
            }
            
        }
    }

    //User Data
    

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [department,setDepartment] = useState("");
    const [trackList,setTrackList] = useState([]);
    const [formations,setFormations] = useState([]);
    const [uid,setUid] =useState("");

    const toogleSwitch = () => setIsAdmin(!isAdmin)



    //Values initialization

    
   useEffect (()=> {
    let isSubscribed = true;
    fetchKainosData(isSubscribed);
    fetchAgentData();
    fetchUserData();
    if (!loadingAgent) {
        setFirstname(agent.firstname);
        setLastname(agent.lastname);
        setEmail(agent.email);
        setPhone(agent.phone);
        setCity(agent.city);
        setGender(agent.gender);
        setAge(agent.age);
        setIsAdmin(agent.isAdmin);
        setDepartment(agent.department);
        setTrackList(agent.trackList);
        setFormations(agent.formations);
        setUid(id);

    }else {
        return (
            <View style = {styles.loadingContainer}>
                <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
            </View>
        )
    }

    return() =>{isSubscribed = false}
   },[loadingKainos,loadingAgent]);

   //Visibility
   const [visibility,setVisibility] = useState(false)

   //Update database
   const update = ()=> {

        firestore().collection("Agents").get().then(
            querySnapshot => {
                var mTrackList = []
                querySnapshot.forEach(documnetSnapshot => {
                    documnetSnapshot.data().trackList.forEach(item => {
                        mTrackList.push(item.uid)
                    });
                    trackList.forEach((item) => {
                        if (mTrackList.includes(item.uid) && documnetSnapshot.id !== uid) {
                            firestore().collection("Agents").doc(documnetSnapshot.id).update({
                                trackList : firestore.FieldValue.arrayRemove({uid : item.uid, fullName : item.fullName})
                            })
                        }
                    })
                })
            }
        ).catch(e => console.log("From deleting to other agents :",e))
        .then( firestore().collection("Agents").doc(uid).update({
            trackList : trackList
        })).catch(e => console.log(e)).then(

            trackList.forEach((item) => {
                firestore().collection("Kainos").doc(item.uid).update({
                    agent : {fullName : firstname + " " + lastname, agentId : uid}
                }).catch(e => console.log("Updating to kainos : ",e))
            })
        ).catch(e => console.log(e))
       
      
       
        

   }

   //Delete from database

   const deleteAgent = () => {
        trackList.forEach((item) => {
                firestore().collection("Kainos").doc(item.uid).update({
                agent : ""
            }).then(()=>{
                console.log("Update for deleting successful")
             }).catch(e => console.log(e))
        })
        firestore().collection("Agents").doc(uid).delete().then( () =>
            navigation.goBack()
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

    const pickerGetValue = (value) => {
        const index = kainosNamesList.indexOf(value);
        var contain = false;
        if(index !== -1) {
            const newKainos = {
                fullName : value,
                uid : kainosList[index].key
            }

            for (var i = 0 ; i<trackList.length ; i++) {
                if(trackList[i].fullName === value) {
                    contain = true;
                    break;
                }
            }
            if(!contain) {
                trackList.push(newKainos);
            }
        }
    }

    





    return ( 
        <ScrollView style = {styles.container}>
             {(loadingKainos || loadingAgent || loadingUser) ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) : (
                 
            <View>
                    <Modal animationType = "slide" transparent = {true} visible = {visibility} onRequestClose = {() =>{setVisibility(!visibility)}}>
                    <View style = {styles.modalContainer}>
                        <View style = {styles.modalView}>

                            <FormPicker data = {kainosList} title = {"Ajouter un Kainos"} style = {styles.textInput} getPickerValue = {(value) => pickerGetValue(value)}/>
                           
                            <View style = {styles.modalButtonContainer}>
                                <ValidButton title = "Modifier" style = {styles.modalButtonValid} onPress = {() => {
                                    setVisibility(false)
                                   
                               
        
                                 }}/>
                                <ValidButton title = "Annuler" style = {styles.modalButtonCancel} onPress = {() => {setVisibility(false)}}/>
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
                              
                    <Text style = {styles.headerName}>{firstname + " " + lastname}</Text>
                    <Text style = {styles.headerSubText}>{gender}</Text>
                    <View style = {{flexDirection : "row",alignItems :"center",justifyContent : "center"}}>
                        <Text style = {styles.headerSubText}>{isAdmin ? "Administrateur" : "Pas administrateur"}</Text>
                        {(userAdmin) ? (
                            <View style = {{marginHorizontal : 20}}>
                                <Switch value = {isAdmin} onValueChange = {toogleSwitch}/>
                            </View>
                        ) : (
                            null
                        )}
                        
                        
                        
                        
                        
                            
                        
                       
                    </View>
                   

                    
                </View>

                <NoneEditableText title = "Adresse courriel"  content = {email} />
                <NoneEditableText title = "Téléphone"  content = {phone} />
                <NoneEditableText title = "Ville"  content = {city} />
                <NoneEditableText title = "Tranche d'âge"  content = {age} />
                <NoneEditableText title = "Département"  content = {department} />
                <FormationArea formations = {formations} />    
                <TrackListArea data = {trackList} onPress = {()=> 
                    {
                        if (userAdmin) {
                            setVisibility(true)
                        } else {
                            alert("Seul les administarteurs ont accès à cette fonction")
                        }
                    }
                    }/>
               
                <View style = {{alignItems : "center"}}>
                    <ValidButton title = "Supprimer ce agent" style = {styles.deleteButton} onPress = {() => {
                        if(userAdmin) {
                            Alert.alert(
                                "Suppression",
                                "Voulez-vous supprimer cet agent ?",
                                [
                                    {
                                        text : "Supprimer",
                                        onPress :() => deleteAgent()
                
                                    },
                                    {
                                        text : "Annuler",
                                    }
            
                                ]
            
                            )
                        } else {
                            alert("Seul les administarteurs ont accès à cette fonction")
                        }
                        
                    }} />
                    <ValidButton title = "Soumettre les changements" style = {styles.submitButton} onPress = {() => {
                        if (userAdmin) {
                            Alert.alert(
                                "Soumission",
                                "Voulez-vous soumettre ces modifications ?",
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
                        } else alert("Seul les administarteurs ont accès à cette fonction")
                        
                    }}/>
                </View>
                

           
            </View>)}
           
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

    //CommentArea 

    trackListContainer : {
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

    TrackListTitle : {
        fontSize : 15,
        fontWeight : "500",
        margin : 2,
    },
   
    TrackListContentContainer : {
        margin : 5,
        marginBottom : 10,
    },
    TrackListContent : {
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

    //TrackListCard 
    trackCardContainer: {
        marginHorizontal : 10,
        marginVertical : 10,
        backgroundColor : "#e6e6e6",
        padding : 15,
        borderRadius : 10,
        flexDirection : "column",
        shadowOpacity : 0.3,
        shadowColor : "grey",
        shadowOffset : {width : 1, height : 1},
        shadowRadius : 10,
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


});

export default AgentInfoScreen;