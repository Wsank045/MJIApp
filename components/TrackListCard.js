import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View,TouchableOpacity } from 'react-native';
import DropDownItem from "react-native-drop-down-item";
import { Card } from 'react-native-elements';

const TrackListCard = () => {
    return (
        <Card containerStyle = {styles.card}>
          <TouchableOpacity style = {styles.cardContainer} onPress = {onPress}>
              <View style = {styles.initials}>
                  <Text style = {styles.initialText}>WS</Text>
              </View>
              <View style = {styles.contain}>
                <Text style = {styles.containTitle}>
                    Wilfried Sankara
                </Text>
                <Text style = {styles.containSubText}>
                    Tel : +1 - 514 - 998 - 6116
                </Text>
                <Text style = {styles.containSubText}>
                    Adresse courriel : aaaa@bbb.com
                </Text>
              </View>
          </TouchableOpacity>
      </Card>
    )
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

export default TrackListCard
