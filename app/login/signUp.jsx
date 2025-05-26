import {View, Text,StyleSheet, TouchableOpacity,TextInput, ToastAndroid,Alert} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { useRouter} from 'expo-router';
import {auth} from './../../config/FirebaseConfig'
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";




function signUp() {

    router = useRouter();
    
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [userName,setUserName] = useState();
    const OnCreateAccount=()=>{

        if (!email || !password || !userName) {
  if (ToastAndroid && ToastAndroid.show) {
    ToastAndroid.show('please fill all details', ToastAndroid.BOTTOM);
  } else {
    Alert.alert('please Enter email and password');
  }
  return; // stop further processing
}

        
createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;

    await updateProfile(user,{
        displayName:userName
    })

    await setLocalStorage('userDetail',user);

    router.replace('(tabs)')
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    if(errorCode=='auth/email-already-in-use'){
        ToastAndroid.show('Email already exist',ToastAndroid.BOTTOM)
    }
    
    // ..
  });
    }
  return (
    <View style={{
        padding:25
    }}>
            <text style={styles.textHeader}>Create New Account</text>
             
        <View style={{
            marginTop:25
        }}>
        <Text>Full Name</Text>
        <TextInput placeholder='Full Name' style={styles.textInput}
        onChangeText={(value)=>setUserName(value)}
        />
        </View>

        <View style={{
            marginTop:25
        }}>
        <Text>Email</Text>
        <TextInput placeholder='email' style={styles.textInput}
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
        onPress={OnCreateAccount}
        >
            <Text style={{
                fontSize:17,
                color:'white',
                textAlign:'center'
            }}>Create Account</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.buttonCreate}
        onPress={()=>router.replace('login/signIn')}
        >
            <Text style={{
                fontSize:17,
                color:Colors.PRIMARY,
                textAlign:'center'
            }}>Already account? Sign In</Text>
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

export default signUp