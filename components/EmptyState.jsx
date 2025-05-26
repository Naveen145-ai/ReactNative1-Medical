import { View, Text, Image } from 'react-native';
import React from 'react';

export default function EmptyState() {
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
      }}>No Medidictations!</Text>
      
      <Text>You have 0 Medidictations setup,Kindly setup a new one</Text>
    </View>
  );
}
