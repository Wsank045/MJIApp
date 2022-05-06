import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';

const FormationArea = ({formations,onPress,buttonVisible}) => {


    return(
        <View style = {styles.formationContainer}>
            <Text style = {styles.formationTitle}>Formations</Text>
                
                {formations.map((item) =>  {return(
                    <View key = {item.key}>
                        <Text style = {styles.formationText}>{item.value}</Text>
                    </View>
                )
            })}
            {(buttonVisible) ? (
                 <FAB style = {styles.fab}
                 icon = {
                     <Icon name  = "plus" type = "font-awesome" color = "#fff"/>
                 }
                 color = "#2D679D"
                 size = "small"
                 onPress = {onPress}/>
            ) : null}
           
        </View>
    )
}

const styles = StyleSheet.create ( {
    //FormationContainer
    
        formationContainer : {
            marginHorizontal : 20,
            marginVertical : 20,
            backgroundColor : "#e6e6e6",
            padding : 15,
            borderRadius : 10,
            shadowOpacity : 0.3,
            flexDirection : "column",
            shadowColor : "grey",
            shadowOffset : {width : 1, height : 1},
            shadowRadius : 10,
        },
    
        formationTitle : {
            fontSize : 15,
            fontWeight : "500",
            margin : 2,
        },
    
        formationContent : {
            flexDirection : "row",
        },
    
        formationText : {
            fontSize: 17,
            fontWeight : "300",
            marginLeft : 15,
            color : "#2D679D",
            marginVertical : 10,
        }
})

export default FormationArea;