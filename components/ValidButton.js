import React from 'react';
import { TouchableOpacity,Text,StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';


const ValidButton = ({title, ...rest}) => {
    return ( 
        <TouchableOpacity {...rest}>
            <Text style = {styles.buttonText}>{title}</Text>
        </TouchableOpacity>
     );
}
 
export default ValidButton;





const styles = StyleSheet.create({
    
       buttonText : {
        // fontFamily : "Lato",
         fontWeight : "bold",
         fontSize : 20,
         color :"white",
       },
    
       
    
    
      })