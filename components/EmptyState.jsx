import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from './../constant/Colors'
import ConstantString from '../constant/ConstantString';
import { useRouter } from 'expo-router';

export default function EmptyState() {
  const router = useRouter();
  return (
    <View sttyle={{
        marginTop:80,
        display:'flex',
        alignItems:'center'
    }}>
      <Image 
        source={require('./../assets/images/medical.png')}
        style={{
          width: 120,
          height: 120
        }}
      />
      <Text style={{
        fontSize:35,
        fontWeight:'bold',
        marginTop:30
      }}>{ConstantString.NoMedication}</Text>
      
      <Text style={{
        fontSize:16,
        color:Colors.DARK_GRAY,
        textAlign:'center',
        marginTop:20
      }}>{ConstantString.MedicationSubText}</Text>

      <TouchableOpacity style={{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:10,
        width:'100%',
        marginTop:30
      }}
       onPress={()=>router.replace('/add-new-medication')}
      
      >

       
        <Text style={{
          textAlign:'center',
          fontSize:17,
          color:'white'
        }}>{ConstantString.AddNewMedicationBtn}</Text>
      </TouchableOpacity>
    </View>
  );
}
