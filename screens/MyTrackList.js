import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { View,TouchableOpacity } from 'react-native';
import DropDownItem from "react-native-drop-down-item";
import { Card } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import { useState,useContext,useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const TrackListCard = ({fullName,onPress}) => {
    return (
        <Card containerStyle = {styles.card}>
          <TouchableOpacity style = {styles.cardContainer} onPress = {onPress}>
              <View style = {styles.contain}>
                <Text style = {styles.containTitle}>
                    {fullName}
                </Text>
              </View>
          </TouchableOpacity>
      </Card>
    )
}

const MyTrackList = ({navigation}) => {

    const {user} = useContext(AuthContext);
    userUid = user.uid;

    const [trackList,setTrackList] = useState([]);
    const [loading,setLoading] = useState(true);


    const fetchData = () => {

        firestore().collection("Agents").doc(userUid).get().then(
            documentSnapshot => {
                setTrackList(documentSnapshot.data().trackList)
                setLoading(false)
                
            }
        ).catch(e => console.log("From fetching data ", e))

    }

    
    

    useEffect(() => {
        fetchData()
    }, [loading])


    return ( 
        <View style = {{flex : 1}}>
            {(loading) ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) : (<FlatList
                data = {trackList}
                keyExtractor={item => item.uid}
                renderItem = {({item}) => (
                    <TrackListCard  fullName = {item.fullName} 
                    
                    onPress = {()=> navigation.navigate("KainosInfoScreen", {
                        id :item.uid
                        
                    })}/>
                )}
            />) 
            }
            
        </View>
     );
}

const styles = StyleSheet.create({
    card : {
        borderRadius : 10,
        elevation : 2,
        shadowOffset : {width : 2,height : 2},
        shadowColor : "grey",
        shadowRadius : 5,
        margin : 10,
 
     },
 
     cardContainer : {
         flexDirection : "row",
         alignItems : "center"
 
     },
 
     initials : {
         width : 50,
         height : 50,
         justifyContent : "center",
         alignItems : "center",
         backgroundColor : "#344175",
         borderRadius : 50,
         
     },
 
     initialText : {
         color : "white",
         fontSize : 15,
         fontWeight : "400"
     },
 
     contain : {
           //backgroundColor : "green",
           //height : 50
     },
 
     containTitle : {
         //backgroundColor : "blue",
         marginTop : 10,
         marginLeft : 20,
         fontSize  : 18,
         fontWeight : "400"
     },
 
     containSubText : {
         marginTop : 5,
         height : 15,
         width : 180,
         //backgroundColor : "yellow",
         marginLeft : 30,
         fontWeight : "200"
         
     }
})
 
export default MyTrackList;