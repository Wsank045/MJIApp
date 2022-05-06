import React, {useContext,useState,useEffect} from 'react';
import { Image,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View ,StyleSheet,Text,FlatList,ScrollView} from 'react-native';
import HomeCard from '../components/HomeCard';
import { Button } from 'react-native-elements';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';




const data = [
    {
        id : 1,
        title : "Ma liste de suivi",
        img : require ("../Asset/Icon/note(1).png"),
        screen : "MyTrackList"
    },

    {
        id : 2,
        title : "Les jeunes du MJI",
        img : require ("../Asset/Icon/personal-data.png"),
        screen : "KainosListScreen"
    },

    {
        id : 3,
        title : "Ajouter un nouveau",
        img : require ("../Asset/Icon/add-user(1).png"),
        screen : "AddKainosScreen"
    },

    {
        id : 4,
        title : "Ajouter un agent d'intégration",
        img : require ("../Asset/Icon/add-group.png"),
        screen : "AddAgentScreen"
    },

    {
        id : 5,
        title : "Faire une affectation de suivi",
        img : require ("../Asset/Icon/checklist(1).png"),
        screen : "SelectKainosScreen"
    },
    {
        id : 6,
        title : "Les agent d'intégration",
        img : require ("../Asset/Icon/profile.png"),
        screen : "AgentListScreen"
    },
    
   
];






const HomeScreen = ({ navigation }) => {

    const {logOut} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const userId = user.uid
    const [userName,setUserName] = useState ("");
    const [userAdmin,setUserAdmin] = useState(false);
    const [loading,setLoading] = useState(true);

    const fetchData = async () => {
        try {
            await firestore().collection("Agents").doc(userId).get().then(
                documentSnapshot => {
                    setUserName(documentSnapshot.data().firstname + " " + documentSnapshot.data().lastname);
                    setUserAdmin (documentSnapshot.data().isAdmin),
                    setLoading(false)
                }
            )
        } catch (error) {
            
        }
    }

    useEffect (()=> {
        fetchData();
    },[loading])

    const Header = () => {
        return (
            <View style = {styles.header}>
                <Text style = {styles.textHeader}>Bonjour,{"\n"}{userName}</Text>
                <Image style = {styles.img} source = {require("../Asset/log.png")}/>
            </View>
        )
    }

    
    return ( 
        
        <View style = {styles.homeScreen}>
            <StatusBar barStyle="light-content"/>
              {(loading) ? (<View style = {styles.loadingContainer}>
                                        <ActivityIndicator animating = {true} size="large" color="#2D679D"/> 
                 </View>) : (
                    <View style = {{flex : 1}}>
                      <Header/>
                
                      <FlatList
                      data = {data}
                      numColumns = {2}
                      renderItem = {
                          ({item}) => <HomeCard img = {item.img} title = {item.title} onPress = {() => 
                            {
                                if(!userAdmin) {
                                    if (item.title === "Ajouter un agent d'intégration" || item.title === "Faire une affectation de suivi" || item.title === "Ajouter un nouveau") {
                                        alert("Seul les administrateur ont accès à ces fonctionnalités !")
                                    } else {
                                        navigation.navigate(item.screen)
                                    }
                                } else {
                                    navigation.navigate(item.screen)
                                }
                            }
                            }/>
                      }
                      keyExtractor = {(item,index) => index.toString()}
                        />
                    
                    </View>
                 )}
        </View>
           
        
               
       


        
     );
}

const styles = StyleSheet.create ({
    homeScreen : {
        flex : 1,
    },

    header : {
        flexDirection : "row",
         borderBottomLeftRadius : 10,
         borderBottomRightRadius : 10,
    },

    textHeader : {
        flex : 2,
        color : "#344175",
        fontSize : 25,
        paddingTop : 30,
        marginLeft : 20,
        fontWeight : "200",
    },
    img:{
        marginRight : 20,
        width : 50,
        height : 50,
        marginTop : 30,
    }
})
 
export default HomeScreen ;