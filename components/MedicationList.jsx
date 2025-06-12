import { View, Text, FlatList,Image,StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import { Background } from '@react-navigation/elements';
import Colors from '../constant/Colors';
import { getLocalStorage } from '../service/Storage';

export default function MedicationList() {

    const [medList,setMedList]  =useState();
    const [dateRange,setDateRange]=useState();
    const [selectedDate,setSelectedDate]  = useState(moment().format('MM/DD/YYYY'));


    useEffect(()=>{
        GetDateRangeList();
        GetMedicationList(selectedDate);  // for data fetching
    },[])

    const GetDateRangeList=()=>{
        const dateRange = GetDateRangeToDisplay();
       setDateRange(dateRange);
        
    }

    const GetMedicationList=async(selectedDate)=>{
        const user=await getLocalStorage('userDetail');

        try{
            const q = query(collection(db,'medication'),
        where('userEmail','==',user?.email),
        where('dates','array-contains',selectedDate));

        const querySnapshot = await getDocs(q);
        setMedList([]);
        querySnapshot.forEach((doc)=>{
            console.log("docId:"+doc.data())
            setMedList(prev=>[...prev,doc.data()])
            
        })
        }catch(e){
            console.log(e);
            
        }
    }

  return (
    <View style={{
        marginTop:25
    }}>
      <Image source={require('./../assests/images/mediacl.png')}
      style={{
        width:'100%',
        height:200,
        borderRadius:15
      }}

      />

      <FlatList  
      data={dateRange}
      horizontal
      style={{marginTop:15}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <TouchableOpacity style={[styles.dateGroup,{backgroundColor:item.formattedDate==selectedDate?Colors.PRIMARY:Colors.LIGHT_GRAY_BORDER}]}
        onPress={()=>setSelectedDate(item.formattedDate)}>
        

            <Text style={[styles.day,{color:item.formattedDate==selectedDate?'white':'black'}]}>{item.day}</Text>
            <Text style={[styles.date,{color:item.formattedDate==selectedDate?'white':'black'}]}>{item.date}</Text>
            </TouchableOpacity>
      )}
      />


      <FlatList 
  data={medList}
  renderItem={({ item, index }) => (
    <MedicationList medicine={item} />
  )}
/>

    </View>
  )
}


const styles = StyleSheet.create({
    dateGroup:{
        padding:15,
        BackgroundColor:Colors.LIGHT_GRAY_BORDER,
        display:'flex',
        alignItems:'center',
        marginRight:20,
        borderRadius:10
    },
    day:{
        fontSize:20
    },
    date:{
        fontSize:26,
        fontWeight:'bold'
    }
})