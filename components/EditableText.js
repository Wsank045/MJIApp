import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView ,StyleSheet,View,Image,Text} from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';


const EditableText = ({title,content, onPress, ...rest}) => {
    return(
        <View style ={styles.editableContainer}>
            <View style = {styles.editableTextContainer}>
                <Text style = {styles.editableTitle}>
                    {title}
                </Text>
                <Text style = {styles.editableContent}>
                    {content}
                </Text>
            </View>
            
            <TouchableOpacity onPress = {onPress} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Icon name = "edit" size = {20}/>
            </TouchableOpacity>
            
        </View>
        
    )
}



const styles = StyleSheet.create ( {

    //EditableText

    editableContainer : {
        marginHorizontal : 20,
        marginVertical : 20,
        height : 70,
        backgroundColor : "#e6e6e6",
        padding : 15,
        borderRadius : 10,
        flexDirection : "row",
        shadowOpacity : 0.3,
        shadowColor : "grey",
        shadowOffset : {width : 1, height : 1},
        shadowRadius : 10,


    },

    editableTextContainer : {
        flex :2,
    },
    editableTitle : {
        fontSize : 15,
        fontWeight : "500",
        margin : 2,
    },
    editableContent : {
        fontSize: 17,
        fontWeight : "300",
        marginLeft : 15,
        color : "#2D679D"
    }

})

export default EditableText;