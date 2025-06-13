import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import { getLocalStorage } from '../utils/LocalStorage';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const Menu = [
    {
      id: 1,
      name: 'Add New Medication',
      icon: 'add-circle',
      path: '/add-new-medication',
    },
    {
      id: 5,
      name: 'My Medication',
      icon: 'medkit',
      path: '(tabs)',
    },
    {
      id: 2,
      name: 'History',
      icon: 'time',
      path: '/history',
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
      path: '/login', // Assuming you navigate to login page after logout
    },
  ];

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    const userData = await getLocalStorage('userDetail');
    setUser(userData);
  };

  const onPressMenu = (menu) => {
    if (menu.name === 'Logout') {
      // Add logout logic here if needed
    }
    router.push(menu.path);
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 26,
          marginBottom: 5,
        }}
      >
        Tubeguruji
      </Text>

      <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 16,
          color: Colors.GRAY,
        }}
      >
        {user?.email || 'account@tubeguruji.com'}
      </Text>

      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            style={{
              marginVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              padding: 15,
              backgroundColor: '#f2f2f2',
              borderRadius: 10,
            }}
          >
            <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
