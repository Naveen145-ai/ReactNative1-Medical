import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../service/Storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
// import Colors from '../../constant/Colors'

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage('userDetail');
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={require('./../assets/images/medical.png')}
            style={{ width: 45, height: 45 }}
          />

          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Hello {user?.displayName ?? 'Guest'} 👋
          </Text>
        </View>
          <TouchableOpacity onPress={()=>router.replace('/add-new-medication')}>
        <Ionicons name="medkit-outline" size={34} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
