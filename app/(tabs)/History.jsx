import { Background } from '@react-navigation/elements';
import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, {  useState } from 'react';
import { GetDateRangeToDisplay } from '../../service/ConvertDateTime';
import moment from 'moment';
import { getLocalStorage } from '../service/Storage';
import { collection, query, where, getDocs } from 'firebase/firestore'; // assumed missing
import { db } from '../config/FirebaseConfig'; 
import MedicationCardItem from './MedicationCardItem'; // assuming you're using this
import EmptyState from './EmptyState'; 

export default function History() {

    const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
    const [dateRange, setDateRange] = useState();
    const [loading,setLoading]  =useState(false);
    const [medList,setMedList] = useState();

    useEffect(()=>{
      GetDateList();
      GetMedicationList(selectedDate);
    },[])

    const GetDateList=()=>{
      const dates = GetDateRangeToDisplay();
      setDateRange(dates);
    }

    const GetMedicationList = async (selectedDate) => {
        setLoading(true);
        const user = await getLocalStorage('userDetail');
        setMedList([]);
    
        try {
          const q = query(
            collection(db, 'medication'),
            where('userEmail', '==', user?.email),
            where('dates', 'array-contains', selectedDate)
          );
    
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setMedList((prev) => [...prev, doc.data()]);
          });
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };


  return (
    <FlatList 
    data={[]}
    style={{
      height:'200%',
      backgroundColor:'white'
    }}
    ListHeaderComponent={
    <View style={styles?.mainContainer}>

      <Image source={require('./../../assets/images/med-history.png')}
      style={styles.imageBanner}

      />
      <Text style={styles.header}>Mediaction History</Text>

      <FlatList
              data={dateRange}
              horizontal
              style={{ marginTop: 15 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dateGroup,
                    {
                      backgroundColor:
                        item.formattedDate === selectedDate ? Colors.PRIMARY : Colors.LIGHT_GRAY_BORDER,
                    },
                  ]}
                  onPress={() => {
                    setSelectedDate(item.formattedDate);
                    GetMedicationList(item.formattedDate);
                  }}
                >
                  <Text
                    style={[
                      styles.day,
                      { color: item.formattedDate === selectedDate ? 'white' : 'black' },
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.date,
                      { color: item.formattedDate === selectedDate ? 'white' : 'black' },
                    ]}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              )}
            />

             { medList?.length > 0 ? (
                    <FlatList
                      data={medList}
                      onRefresh={() => GetMedicationList(selectedDate)}
                      refreshing={loading}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => router.replace({
                            pathname:'action-modal',
                            params:{
                                ...item,
                                selectedDate:selectedDate
                            }
                        })}>
                          <MedicationCardItem medicine={item} selectedDate={selectedDate}/>
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                   <Text style={{fontSize:25,padding:30,fontWeight:'bold',textAlign:'center'}}>No Mediaction form</Text>
                  )}
    </View>}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    padding:25,
    BackgroundColor:'white',
    height:'100%'
  },
  imageBanner:{
    width:'100%',
    height:200,
    borderRadius:15
  },
  header:{
    fontSize:25,
    fontWeight:'bold',
    marginTop:25
  },dateGroup: {
      padding: 15,
      backgroundColor: Colors.LIGHT_GRAY_BORDER,
      display: 'flex',
      alignItems: 'center',
      marginRight: 20,
      borderRadius: 10,
    },
    day: {
      fontSize: 20,
    },
    date: {
      fontSize: 26,
      fontWeight: 'bold',
    }
})
