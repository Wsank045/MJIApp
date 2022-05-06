import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image,Text } from 'react-native';
import { StyleSheet,View } from 'react-native';
import { Card } from 'react-native-elements';
import { windowHeight, windowWidth } from '../utils/Dimensions';



const HomeCard = ({img,title ,onPress,...rest}) => {
    return ( 
            <Card containerStyle = {styles.card}>

                <TouchableOpacity style = {styles.cardContain} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress = {onPress}>
                        <Card.Image style = {styles.cardImg} source = {img}>
                            
                        </Card.Image>
                        <View style = {styles.cardContain} >
                        <Card.Title style = {styles.cardText} >{title}</Card.Title>
                        </View>
                        

                </TouchableOpacity>

            </Card>
       
      
     );
}
 
export default HomeCard;


const styles = StyleSheet.create({

    card : {
       flex :1,
       alignItems : "center",
       backgroundColor : "#e6e6e6",
       borderRadius : 10,
       padding : 15,
       elevation : 3,
       shadowOffset : {width : 5, height : 5},
       shadowColor : "black",
       shadowOpacity : 0.3,
       shadowRadius : 2,
       marginHorizontal : 20,
       marginVertical : 25,
    },

    cardFirstContain : {
        flex : 1,
        alignItems : "center",
        backgroundColor : "white",
    },

    cardContain: {
        alignItems : "center",
        justifyContent : "center",
    },


    cardImg : {
        width : windowWidth/7,
        height : windowHeight/14,
        resizeMode : "contain",
        padding : 5,
    },
    cardText : {
        color : "#344175",
        fontSize : 12,
        fontWeight : "300",
        marginTop : 5,
        //flexWrap : "wrap",
    }


})