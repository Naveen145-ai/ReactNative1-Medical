import {View, Text, Touchable,StyleSheet, TouchableOpacity,TextInput,Alert} from 'react-native'
import React from 'react'
import { Background } from '@react-navigation/elements'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router';
import {auth} from './../../config/FirebaseConfig'
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLocalStorage } from '../../service/Storage';
function signIn() {

    const router = useRouter();

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const onSignInClick=()=>{

        if(!email||!password){
            Alert.alert('Please enter email and password')
            return ;
        }

        signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);

    await setLocalStorage('userDetail',user);

    router.replace('/(tabs)')


    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode=='auth/invalid-credential'){
        Alert.alert('Invalid email or password')
    }
  });
    }
  return (
    <View>
        <text style={styles.textHeader}>Let's Sign You In</text>
         <text style={styles.subText}>Welcome Back</text>
          <text style={styles.subText}>You've been missed!</text>
    <View style={{
        marginTop:25
    }}>
    <Text>Email</Text>
    <TextInput placeholder='Email' style={styles.textInput}
    onChangeText={(value)=>setEmail(value)}
    />
    </View>

        <View style={{
        marginTop:25
    }}>
    <Text>Password</Text>
    <TextInput placeholder='password' 
    secureTextEntry={true}
    style={styles.textInput}
    onChangeText={(value)=>setPassword(value)}
    />
    </View>

    <TouchableOpacity style={styles.button}
    onPress={onSignInClick}
    >
        <Text style={{
            fontSize:17,
            color:'white',
            textAlign:'center'
        }}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonCreate}
    onPress={()=>router.replace('login/signUp')}
    >
        <Text style={{
            fontSize:17,
            color:Colors.PRIMARY,
            textAlign:'center'
        }}>Create Account</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    textHeader:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:15
    },
    subText:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        color:Colors.GRAY
    },
    textInput:{
        padding:10,
        borderWidth:1,
        fontSize:17,
        borderRadius:5,
        marginTop:5,
        backgroundColor:'white'
    },
    button:{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        marginTop:35
    },
    buttonCreate:{
        padding:20,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:20,
        borderWidth:1,
        borderColor:Colors.PRIMARY
    }
})

export default signIn