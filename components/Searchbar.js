import React, {useState} from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View, } from 'react-native';
import { SearchBar} from 'react-native-elements';

const Searchbar = ({getSearch}) => {
   const [search, setSearch] = useState("");
   
   const updateSearch = (value) => {
       setSearch(value)
       getSearch(value)
   }
    return (
        <View>
             <SearchBar containerStyle = {styles.searchBarContainer}
                        inputContainerStyle = {styles.searchBarInput}
                placeholder = "Type Here.."
                onChangeText = {updateSearch}
                value = {search}
                lightTheme = {true}   
            />
        </View>
       
    );
}

const styles = StyleSheet.create({

    //Seach Bar Style
    searchBarContainer : {
        backgroundColor : "white",
        borderWidth : 0,
        borderColor : "white",
        height : 50,
        margin : 10,
        width : Dimensions.get("window").width - 30,
        borderRadius : 14
    },
    searchBarInput : {
        height : 30,
        backgroundColor : "white",
    },
})

export default Searchbar;