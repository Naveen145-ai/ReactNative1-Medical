import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment'; // missing import
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import Colors from '../constant/Colors';
import { getLocalStorage } from '../service/Storage';
import { collection, query, where, getDocs } from 'firebase/firestore'; // assumed missing
import { db } from '../config/FirebaseConfig'; // assumed import
import MedicationCardItem from './MedicationCardItem'; // assuming you're using this
import EmptyState from './EmptyState'; // assumed to exist
import { useRouter } from 'expo-router';

export default function MedicationList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);

  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  };

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
    <View style={{ marginTop: 25 }}>
      <Image
          source={require('./../assets/images/medical.png')}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15,
        }}
      />

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
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
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
  },
});
