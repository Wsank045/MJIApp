import  React from 'react';
import {useContext } from 'react';
import { Button, Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { windowHeight } from '../utils/Dimensions';
import KainosListScreen from '../screens/KainosListScreen';
import AddKainosScreen from '../screens/AddKainosScreen';
import AddAgentScreen from '../screens/AddAgentScreen';
import MyTrackList from '../screens/MyTrackList';
import AgentListScreen from '../screens/AgentListScreen';
import KainosInfoScreen from '../screens/KainosInfoScreen';
import AgentInfoScreen from '../screens/AgentInfoScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SelectKainosScreen from '../screens/SelectKainosScreen';
import SelectAgentScreen from '../screens/SelectAgentScreen';
import { Alert, View } from 'react-native';
import { AuthContext
 } from './AuthProvider';

const Stack = createStackNavigator();

const AppStack = () => {

    const {logOut} = useContext(AuthContext)

    return ( 
        <Stack.Navigator >
         
         <Stack.Screen name = "HomeScreen" component = {HomeScreen}
          options={({navigation}) => ({
            title: 'Acceuil',
            headerTitleStyle : {color : "white", fontSize : 22},
            headerShown: true,
            headerRight: () => (
              <View style = {{flexDirection : "row",marginRight : 10}}>
                <Icon
                  style = {{marginHorizontal: 10}}

                 size = {25}
                  name = "user"
                  type = "font-awesome"
                  onPress={() => navigation.navigate("MyProfileScreen")}
                  color="#fff"
              />
              <Icon
                style = {{marginHorizontal : 10}}
                  type = "font-awesome"
                  name = "sign-out"
                  size = {25}
                  onPress={() => {
                    Alert.alert(
                      "Déconnexion",
                      "Êtes - vous sûr(e) de vouloir vous déconnecter ?",
                      [
                          {
                            text : "Déconnecter",
                            onPress : logOut,
                          },
                          {
                            text : "Annuler",
                            onPress : () => console.log("Annuler")

                          }
                      ]
                    )
                  }}
                  color="#fff"
              />
              </View>
              )
            ,
              headerStyle : {backgroundColor : "#344175",
              borderBottomRightRadius : 10,
              borderBottomLeftRadius  : 10,
              height : windowHeight/7,
            }
          })}
         />
         <Stack.Screen name = "KainosListScreen" component = {KainosListScreen}
          options={{
            title: 'Les jeunes du MJI',
            headerTitleStyle : {color : "white", fontSize : 22},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
              borderBottomRightRadius : 10,
              borderBottomLeftRadius  : 10,
              height : windowHeight/7,
            }
          }}
         />
          <Stack.Screen name = "AddKainosScreen" component = {AddKainosScreen}
          options={{
            title: 'Ajouter un Kainos',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }}}
          />

        <Stack.Screen name = "AddAgentScreen" component = {AddAgentScreen}
          options={{
            title: 'Ajouter un agent de suivi',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }}}
          />

        <Stack.Screen name = "MyTrackList" component = {MyTrackList}
          options={{
            title: 'Ma liste de suivi',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}
         />
         <Stack.Screen name = "AgentListScreen" component = {AgentListScreen}
          options={{
            title: 'Les agents de suivi',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}
         />
         {/**Kainos info page */}
         <Stack.Screen name = "KainosInfoScreen" component = {KainosInfoScreen}
          options={{
            title: 'Informations',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}
          />

          {/**Agent Info page */}
          <Stack.Screen name = "AgentInfoScreen" component = {AgentInfoScreen}
          options={{
            title: 'Informations',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}

         />

         {/**Profile Screen */}

         <Stack.Screen name = "MyProfileScreen" component = {MyProfileScreen}
          options={{
            title: 'Mon profil',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}

         />

          {/**Select Kainos Screen */}
          <Stack.Screen name = "SelectKainosScreen" component = {SelectKainosScreen}
          options={{
            title: 'Selectionnez',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}

         />

          {/**Select Agent Screen */}
          <Stack.Screen name = "SelectAgentScreen" component = {SelectAgentScreen}
          options={{
            title: 'Selectionnez',
            headerTitleStyle : {color : "white", fontSize : 20},
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle : {backgroundColor : "#344175",
            borderBottomRightRadius : 10,
            borderBottomLeftRadius  : 10,
            height : windowHeight/7,
          }
          }}

         />
       </Stack.Navigator>
     );
}
 
export default AppStack;