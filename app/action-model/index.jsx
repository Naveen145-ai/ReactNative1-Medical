import { View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors';
import MedicationCardItem from '../../components/MedicationCardItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { arrayUnion, updateDoc } from 'firebase/firestore';

export default function MedicationActionModel() {
    const medicine = useLocalSearchParams();
    const router = useRouter();

    const UpdateActionStatus=async(status)=>{
        try {
            const docRef=doc(db,'medication',medicine?.docId);
            await updateDoc(docRef,{
                action:arrayUnion({
                    status:status,
                    time:moment().format('LT'),
                    date:medicine?.selectedDate
                                
                })
            });

            Alert.alert(status,'Response saved!',[
                {
                    text:'Ok',
                    onPress:()=>router.replace('(tabs)')
                }
            ])

        } catch (error) {
            console.log(error);
            
        }
    }
    
  return (
    <View style={styles.container}>
        <Image source={require('./../../assets/images/notification.png')}
        style={{
            width:80,
            height:120,

        }}
        />
        <Text style={{fontSize:18}}>{medicine?.selectedDate}</Text>
        <Text style={{fontSize:38,fontWeight:'bold',color:Colors.PRIMARY}}>{medicine?.reminder}</Text>
        <Text style={{fontSize:18}}>It's time to take</Text>

        <MedicationCardItem medicine={medicine}/>

        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.closeButton}
            onPress={()=>UpdateActionStatus('Missed')}
            >
                <Ionicons name="close-outline" size={24} color="red" />
                <Text style={{
                    fontSize:20,
                    color:'red'
                }}>Missed</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.successButton}
              onPress={()=>UpdateActionStatus('Taken')}
             >
                <Ionicons name="checkmark-outline" size={24} color="white" />
                <Text style={{
                    fontSize:20,
                    color:'white'
                }}>Taken</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
            onPress={()=>router.back()}
            position:'absolute',
            bottom:25
        }}>
            <Ionicons name='close-circle' size={44} color={Colors.GRAY} />
        </TouchableOpacity>


      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        height:'100%'
    },
    btnContainer:{
        flexDirection:'row',
        marginTop:25,
        gap:10

    },
    closeButton:{
        padding:10,
        flexDirection:"row",
        gap:6,
        borderWidth:1,
        borderColor:'red',
        alignItems:'center',
        borderRadius:10
    },
    successButton:{
        padding:10,
        flexDirection:"row",
        gap:6,
         alignItems:'center',

       
        backgroundColorr:Colors.GREEN,
        borderRadius:10

    }
})