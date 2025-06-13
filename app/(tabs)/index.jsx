import { View, Text, FlatList } from 'react-native';
import React from 'react';
//import { Button } from 'react-native';
//import { signOut } from '@firebase/auth';
//import { auth } from '../../config/FirebaseConfig';
//import { RemoveLocalStorage } from '../../service/Storage';
import Header from '../../components/Header';
import MedicationList from '../../components/MedicationList';

export default function HomeScreen() {
  return (
    <FlatList 
    
    data={[]}
   
    ListHeaderComponent={
    <View style={{
      padding:25,
      backgroundColor:'white',
      height:'100%',
      width:'100%'
    }}>
     <Header/>

   

     <MedicationList/>
    </View>
    }
     />
  );
}
