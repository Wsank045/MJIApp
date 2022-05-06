import  React from 'react';
import { TextInput } from 'react-native';
import { Input } from 'react-native-elements';


const FormInputs = ({placeholder,secure,...rest}) => {
  return ( 
      <TextInput
          errorStyle = {{color:'red'}}
          errorMessage = "Entrez des informations valides"
          mode = 'outlined' 
          underlineColorAndroid = "transparent"
          placeholder = {placeholder}
          placeholderTextColor = "#cbcdd1"
          secureTextEntry = {secure}
          autoCapitalize = "none"
          editable = {true}
          enablesReturnKeyAutomatically = {true}
          {...rest}
        />

  )
      
}
 
export default FormInputs;


