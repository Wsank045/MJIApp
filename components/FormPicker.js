import React ,{useState}from 'react';
import { StyleSheet,View,Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';



const FormPicker = ({data, title,style, getPickerValue}) => {

    

    const [selected, setSelected] = useState("Select");

    return ( 
        <View style = {style} >
           <RNPickerSelect
                    placeholder={{
                        label: title,
                         value: null,
                    }}
                    items={data}
                    onValueChange={(value) => {
                        setSelected(value)
                        getPickerValue(value)
                    }}

                    

                    value={selected}
                    
                    />
        </View>
      
     );
}

const styles = StyleSheet.create ({
    // container: {
    //     paddingTop: 30,
    //     backgroundColor: '#fff',
    //     justifyContent: 'center',
    //     paddingHorizontal: 10,
    // },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
 
export default FormPicker;