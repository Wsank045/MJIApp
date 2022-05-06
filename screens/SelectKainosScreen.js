import React from 'react';
import { useState , useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import CardCheckBox from '../components/CardCheckBox';
import Searchbar from '../components/Searchbar';
import ValidButton from '../components/ValidButton';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';




const SelectKainosScreen = ({navigation}) => {

    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const [selected,setSelected] = useState([]);

    useEffect(() => {

        const subscriber = firestore()
        .collection('Kainos')
        .onSnapshot((querySnapshot) => {
              const kainos = [];

              querySnapshot.forEach (documnetSnapshot => {
                  kainos.push ({
                      ...documnetSnapshot.data(),
                      key : documnetSnapshot.id,
                      
                  })
              });

              if (search !== "") {
                  setFilterList (  
                      kainos.filter((item)=>{ 
                          return (item.firstname.toLowerCase().includes(search) || item.lastname.toLowerCase().includes(search))
                          //
                          //console.log("firstcase")
                  }))
                  setLoading(false)
              } else if (search === ""){
                  setFilterList(kainos);
                  setLoading(false)  
              }



              
        });

      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, [search]);

    const handleSearch = (value) => {
        setSearch(value.toLowerCase());
    }

    const handleSelection = (value,id,name) => {
        var contains = false
        
        if(value) {
            selected.push({
                fullName : name,
                uid : id,
            })
 
        } else {
            var index = -1
            for(var i = 0 ; i<selected.length ; i++ ) {
                if(selected[i].uid === id) {
                    index = i;
                    break;
                }
            }
            if(index > -1) {
                selected.splice(index,1)
            }
            console.log(index)
    }
    console.log(selected)
}



    return (
        <View>
            <View style = {{alignItems : "center"}}>
                <Searchbar getSearch = {(value) => handleSearch(value) }/>
                <ValidButton title = "Choisir un agent" style={styles.button} onPress = {() => navigation.navigate("SelectAgentScreen",{
                    selection : selected
                })}/>
            </View>
        
        {loading ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) :
        
        (<FlatList
                data = {filterList}
                renderItem = {({item}) => (
                    <CardCheckBox initials = {item.firstname.charAt(0) + item.lastname.charAt(0)} name = {item.firstname + " " + item.lastname} isKainos = {true}
                        tutor = {item.agent.fullName} age = {item.age} gender = {item.gender} disabled = {false} id = {item.uid} getSelected = {handleSelection}
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

export default SelectKainosScreen
