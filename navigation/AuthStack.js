import  React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { windowHeight } from '../utils/Dimensions';
import RegistrationScreen from '../screens/RegistrationScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "LoginScreen" component = {LoginScreen}
                options={{
                    title: 'Connexion',
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
         <Stack.Screen name = "RegistrationScreen" component = {RegistrationScreen}
                options={{
                    title: 'Enregistrement',
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
 
export default AuthStack;