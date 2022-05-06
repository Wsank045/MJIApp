import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userPassword,setUserPassword] = useState("");
    return ( 
        <AuthContext.Provider
            value = {{
                user,
                setUser,
                userPassword,
                setUserPassword,
                login : async (email,password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email,password)
                    }
                     catch(e) {
                        console.log(e);
                        if(e.code === "auth/wrong-password") {
                          alert("Mauvais mot de passe !")
                        }
                    }
                },

                logOut : async () => {
                    try {
                      await auth().signOut();
                    } catch (e) {
                      console.log(e);
                    }
                  },
                
        }}
        >
        {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;