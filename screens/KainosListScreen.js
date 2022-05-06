import React, {useState,useEffect} from 'react';

import {  View,FlatList,Text } from 'react-native';

import Searchbar from "../components/Searchbar";
import ListCard from '../components/ListCard';
import firestore from '@react-native-firebase/firestore';





const KainosListScreen = ({navigation}) => {

    const [filterData, setfilterData] = useState([])
    const [search, setSearch] = useState("");

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
                    setfilterData (  
                        kainos.filter((item)=>{ 
                            return (item.firstname.toLowerCase().includes(search) || item.lastname.toLowerCase().includes(search))
                            //
                            //console.log("firstcase")
                    }))
                } else if (search === ""){
                    setfilterData(kainos)
                   
                }



                
          });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, [search]);

    const handleSearch = (value) => {
        setSearch(value.toLowerCase());
    }


    return ( 
        <View style = {{flex : 1}}>
            <Searchbar getSearch = {(value) => handleSearch(value) }/>
            <FlatList
            
                data = {filterData}
                renderItem = { ({item}) => (
                    <ListCard initials = {item.firstname.charAt(0) + item.lastname.charAt(0)} fullName = {item.firstname + " " +  item.lastname} 
                        phone = {item.phone}
                        onPress = {()=> navigation.navigate("KainosInfoScreen", {
                            id :item.uid
                            
                        })}/>
                )} 
            />
            
        </View>
     );
}


 
export default KainosListScreen;
