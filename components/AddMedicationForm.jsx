import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Platform,Alert,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constant/Colors';
import { Picker } from '@react-native-picker/picker';
import { Type as TypeList, WhenToTake } from './../constant/Options';
import { formatTime, formatDateForText, getDatesRange } from '../service/ConvertDateTime';
import { db } from '../config/FirebaseConfig';
import { useRouter } from 'expo-router';
import { getLocalStorage } from '../service/Storage';
import { doc, setDoc } from 'firebase/firestore';


export default function AddMedicationForm() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading]  =useState(false);

  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

{/* firebase firestore */}
  const SaveMedication=async()=>{


  const docId = Date.now().toString();  // Unique ID
const user = await getLocalStorage('userDetail'); // Your function to get current user

// Validation (AND not OR)
if (!(formData?.name && formData?.type && formData?.dose && formData?.startDate && formData?.endDate && formData?.reminder)) {
  if (Platform.OS === 'web') {
    window.alert('Enter all the fields');
  } else {
    Alert.alert('Enter all the fields');
  }
  return;
}

const dates = getDatesRange(formData?.startDate,formData?.endDate);
console.log((dates));



setLoading(true);

try {
  await setDoc(doc(db, 'medication', docId), {
    ...formData,
    userEmail: user?.email,
    docId: docId,
    dates:dates
  });

  console.log('Data Saved');
  setLoading(false);

  if (Platform.OS === 'web') {
    window.alert('Great! New Medication added successfully!');
    router.replace('(tabs)');
  } else {
    Alert.alert('Great!', 'New Medication added successfully!', [
      {
        text: 'Ok',
        onPress: () => router.replace('(tabs)'),
      },
    ]);
  }
} catch (e) {
  setLoading(false);
  console.error('Error writing to Firestore:', e);
}

}

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>

      {/* Medicine name input */}
      <View style={styles.inputGroup}>
        <Ionicons name="medkit-outline" size={24} color="black" />
        <TextInput
          style={styles.icon}
          placeholder="Medicine name"
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      {/* Type List */}
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={TypeList}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 5 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.LIGHT_GRAY_BORDER,
                backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : 'white',
                marginRight: 10,
              }}
              onPress={() => onHandleInputChange('type', item)}
            >
              <Text
                style={{
                  color: item.name === formData?.type?.name ? 'white' : 'black',
                  fontSize: 16,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Dose Input */}
      <View style={styles.inputGroup}>
        <Ionicons name="eyedrop-outline" size={24} color="black" />
        <TextInput
          style={styles.icon}
          placeholder="Dose Ex. 2, 5 ml"
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      {/* When to take Dropdown */}
      <View style={styles.inputGroup}>
        <Text>When to take</Text>
        <Ionicons name="time-outline" size={24} color="black" />
<Picker
  selectedValue={formData?.when}
  onValueChange={(itemValue) => onHandleInputChange('when', itemValue)}
  style={{ width: '90%' }}
>
  <Picker.Item label="When to take" value="" enabled={false} />
  {WhenToTake.map((item, index) => (
    <Picker.Item key={index} label={item} value={item} />
  ))}
</Picker>

      </View>

      {/* Start and End Date Input for Web */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        {/* Start Date (Web Input) */}
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          {Platform.OS === 'web' ? (
            <input
              type="date"
              style={{ flex: 1, marginLeft: 10, fontSize: 16, borderWidth: 0 }}
              onChange={(e) => {
                const timestamp = new Date(e.target.value).getTime();
                onHandleInputChange('startDate', timestamp);
              }}
            />
          ) : (
            <Text style={styles.text}>{formatDateForText(formData?.startDate) ?? 'Start Date'}</Text>
          )}
        </View>

        {/* End Date (Web Input) */}
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          {Platform.OS === 'web' ? (
            <input
              type="date"
              style={{ flex: 1, marginLeft: 10, fontSize: 16, borderWidth: 0 }}
              onChange={(e) => {
                const timestamp = new Date(e.target.value).getTime();
                onHandleInputChange('endDate', timestamp);
              }}
            />
          ) : (
            <Text style={styles.text}>{formatDateForText(formData?.endDate) ?? 'End Date'}</Text>
          )}
        </View>
      </View>

     {/* Reminder Time Input */}
<View style={styles.dateInputGroup}>
  <View style={[styles.inputGroup, { flex: 1 }]}>
    <Ionicons name="timer-outline" size={24} color="black" />
    {Platform.OS === 'web' ? (
      <input
        type="time"
        style={{ flex: 1, marginLeft: 10, fontSize: 16, borderWidth: 0 }}
        onChange={(e) => {
          onHandleInputChange('reminder', e.target.value);
        }}
      />
    ) : (
      <Text style={styles.text}>{formData?.reminder ?? 'Select Reminder'}</Text>
    )}
  </View>
</View>


      {/* Submit Button */}
      <TouchableOpacity style={styles.button}
      onPress={()=>SaveMedication()}
      >

        {loading?<ActivityIndicator size={'large'} color="white" />:
   //indicator 

        <Text style={styles.buttonText}>Add New Medication</Text>}
      </TouchableOpacity>
    </View>
  );
}





const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: 'white',
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
  typeText: {
    fontSize: 16,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: '100%',
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
  dateInputGroup: {
    marginTop: 10,
  },
});
