import React from 'react';
import { useState,useEffect } from 'react';
import { View, Alert,Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import CardCheckBox from '../components/CardCheckBox';
import Searchbar from '../components/Searchbar';
import firestore from '@react-native-firebase/firestore';
import ValidButton from '../components/ValidButton';
import { ActivityIndicator } from 'react-native';

const SelectAgentScreen = ({route,navigation}) => {

    const {selection} = route.params;
    const [filterList,setFilterList] = useState([]);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(true);
    const [disabled,setDisabled] = useState(false);
    const [id,setId] = useState("");
    const [name,setName] = useState("");

    useEffect(() => {
        const subscriber = firestore()
          .collection('Agents')
          .onSnapshot((querySnapshot) => {
                const agents = [];

                querySnapshot.forEach (documnetSnapshot => {
                    agents.push ({
                        ...documnetSnapshot.data(),
                        key : documnetSnapshot.id,
                        
                    })
                });

                if (search !== "") {
                    setFilterList (  
                        agents.filter((item)=>{ 
                            return (item.firstname.toLowerCase().includes(search) || item.lastname.toLowerCase().includes(search))
                            //
                            //console.log("firstcase")
                    }))
                    setLoading(false)
                } else if (search === ""){
                    setFilterList(agents)
                    setLoading(false)
                   
                }

                
          });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, [search]);

      const update = (id)=> {

        firestore().collection("Agents").get().then(
            querySnapshot => {
                var mTrackList = []
                querySnapshot.forEach(documnetSnapshot => {
                    documnetSnapshot.data().trackList.forEach(item => {
                        mTrackList.push(item.uid)
                    });
                    selection.forEach((item) => {
                        if (mTrackList.includes(item.uid) && documnetSnapshot.id !== id) {
                            firestore().collection("Agents").doc(documnetSnapshot.id).update({
                                trackList : firestore.FieldValue.arrayRemove({uid : item.uid, fullName : item.fullName})
                            })
                        }
                    })
                })
            }
        ).catch(e => console.log("From deleting to other agents :",e))
        .then( firestore().collection("Agents").doc(id).update({
            trackList : selection
        })).catch(e => console.log(e)).then(

            selection.forEach((item) => {
                firestore().collection("Kainos").doc(item.uid).update({
                    agent : {fullName : name, agentId : id}
                }).catch(e => console.log("Updating to kainos : ",e))
            })
        ).catch(e => console.log(e))

   }

      const handleSearch = (value) => {
        setSearch(value.toLowerCase());
     }

     const handleSelection = (value,id,name) => {
         if(value) {
             setDisabled (true)
             setId(id)
             setName(name)
         }

     }

    return (
        <View >
            <View style = {{alignItems : "center"}}>
                <Searchbar  getSearch = {(value) => handleSearch(value) }/>
                <ValidButton title = "Terminer" style={styles.button} onPress = {() => {
                    Alert.alert(
                        "Affectatio de suivi",
                        "Voulez-vous affecter ces Kainos à cet agent ?",
                        [
                            {
                                text : "Affecter",
                                onPress :() => {
                                    if(id !== "") {
                                        update(id)
                                    } else {
                                        Alert.alert(
                                            "Affectatio de suivi",
                                            "Veuillez sélectionner au moins un agent",
                                            [
                                                {
                                                    text : "Ok",
                                                    onPress : () => { console.log("Agent non sélectionné")}
                                                }
                                            ]
                                        )
                                    }
                                    
                                }
        
                            },
                            {
                                text : "Annuler",
                            }

                        ]

                    )
                    navigation.navigate("SelectAgentScreen")
                }}/>
            </View>
            
            {loading ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) :
        
            (<FlatList
                data = {filterList}
                renderItem = {({item}) => (
                    <CardCheckBox initials = {item.firstname.charAt(0) + item.lastname.charAt(0)} name = {item.firstname + " " + item.lastname}
                        isKainos = {false} age = {item.age} gender = {item.gender} disabled = {disabled} id = {item.uid} getSelected = {handleSelection}
                    />
                )}
            />) 
            }
           

        </View>
    )
}

const styles = StyleSheet.create({
    button : {
     backgroundColor : "#F4B95A",
     borderRadius : 10,
     height : 50,
     width : 327,
     marginVertical : 20,
     marginHorizontal : 30,
     justifyContent : "center",
     alignItems : "center",
    }
 })

export default SelectAgentScreen
