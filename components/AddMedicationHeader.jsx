import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
export default function AddMedicationHeader() {
    const router = useRouter();
  return (
    <View>
      <Image source={require('./../assets/images/medical.png')}
      style={{
        height:300,
        width:'100%'
      }}
      />

      <TouchableOpacity style={{
        position:'absolute',
        padding:25

      }}
      onPress={()=>router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}