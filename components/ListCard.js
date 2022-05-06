import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View, } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const ListCard = ({ onPress , initials, fullName, phone }) => {

    return(
      <Card containerStyle = {styles.card}>
          <TouchableOpacity style = {styles.cardContainer} onPress = {onPress}>
              <View style = {styles.initials}>
                  <Text style = {styles.initialText}>{initials}</Text>
              </View>
              <View style = {styles.contain}>
                <Text style = {styles.containTitle}>
                    {fullName}
                </Text>
                <Text style = {styles.containSubText}>
                    {phone}
                </Text>
              </View>
          </TouchableOpacity>
      </Card>
    )
}

const styles = StyleSheet.create({


    //List Card Style

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
          height : 50
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

export default ListCard;