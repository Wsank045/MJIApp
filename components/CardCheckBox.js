import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';

const CardCheckBox = ({initials,isKainos,name,tutor,id,age,gender,getSelected,disabled}) => {
    const [check,setCheck] = useState(false)
    return (
        <TouchableOpacity disabled = {disabled} onPress = {()=> { 
            getSelected(!check,id,name)
            setCheck(!check); 
            }}>
            <View style = {styles.checkCardContainer}>
                <View style = {styles.checkInitialContainer}>
                    <Text style = {{color : "white"}}>{initials}</Text>
                </View>
                <View style = {styles.checkCardContent}>
                    <View style = {styles.checkTextContent}>
                        <Text style={styles.checkName}> {name}</Text>
                        {(isKainos) ?  <Text style={styles.subText}>Tuteur actuel : {tutor}</Text> : null }
                        <Text style={styles.subText}>Tranche d'âge : {age}</Text>
                        <Text style={styles.subText}>Sexe: {gender}</Text>
                    </View>
                     <CheckBox
                        iconType = "font-awesome"
                        checkedIcon = "check"
                        checkedColor = "#F4B95A"
                        uncheckedIcon = ""
                        checked = {check}
                     />
                 </View>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    checkCardContainer : {
        marginHorizontal : 20,
        marginVertical : 20,
        backgroundColor : "#e6e6e6",
        padding : 15,
        borderRadius : 10,
        flexDirection : "row",
        shadowOpacity : 0.3,
        shadowColor : "grey",
        shadowOffset : {width : 1, height : 1},
        shadowRadius : 10,
    },

    checkInitialContainer : {
        width : 50,
        height : 50,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#344175",
        borderRadius : 50,
        marginTop:20
    },
    checkCardContent : {
        flex : 2,
        margin : 20,
        flexDirection : "row"
    },

    checkTextContent : {
        flex :2,
    },
    checkName : {
        fontSize : 20,
        fontWeight : "bold",
        marginBottom : 10,
    },
    subText : {
        fontSize : 10,
        fontWeight : "300",
        paddingBottom : 5
    }

})

export default CardCheckBox
