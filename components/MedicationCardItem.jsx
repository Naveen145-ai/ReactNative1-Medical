import { View, Text,Image,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Background } from '@react-navigation/elements'
import Colors from '../constant/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function MedicationCardItem({medicine,selectedDate}) {

  console.log(medicine);
  const [status,setStatus] = useState();

  useEffect(()=>{
    CheckStatus();
  },[medicine])

  const CheckStatus=()=>{
    const data=medicine?.action?.find((item)=>item.date==selectedDate);
    console.log(data);
    setStatus(data);
    
  }

  
  return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri:medicine?.type?.icon}} 
        
        style={{
            width:60,
            height:60,
        }}

        />
      </View>
    </View>

    <View>
        <Text style={{fontSize:22,fontWeight:'bold'}}>{medicine?.name}</Text>
        <Text style={{fontSize:22}}>{medicine?.when}</Text>
        <Text style={{color:'white'}}>{medicine?.dose} {medicine?.type.name} </Text>
    </View>

    <View style={styles.reminderContainer}>

        <Ionicons name='time-ouline' size={24} color='black' />
        <Text style={{fontWeight:'bold',fontSize:18}}>{medicine?.reminder}</Text>
    </View>

    {status?.date && <View style={styles.statusContainer}>
      {status?.action?.status=='Taken'?<Ionicons name='checkmark-circle' 
      size={24} color={Colors.GREEN} />:status?.action?.status=='Missed'&&
      <Ionicons name="checkmark-circle"
      size={24} color='red'/>}
    </View>}
    </View>
  )
}


const styles = StyleSheet.create({

    container:{
        padding:10,
        //backgroundColor:Colors.LIGHT_PRIMARY,
          borderWidth:1,
        borderColor:Colors.LIGHT_GRAY_BORDER,
        marginTop:10,
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'
    },
    imageContainer:{
        padding:10,
        BackgroundColor:'white',
        borderRadius:15,
        marginTop:15
    },
    subContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    reminderContainer:{
        padding:13,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:'center',
        borderWidth:1,
         borderColor:Colors.LIGHT_GRAY_BORDER

    },
    statusContainer:{
      position:'absolute',
      top:5
    }

})