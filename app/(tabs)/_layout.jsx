import React, { useEffect,  } from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter} from 'expo-router';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {

  const router = useRouter();
  
  useEffect(()=>{
    GetUserDetail();

  })
 

  const GetUserDetail=async()=>{
    const userInfo=await getLocalStorage('userDetail');

    if(!userInfo){
      router.replace('/login')
    }
  }
  //if user login or not 
  /*onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    setAuthenticated(true);
    
    // ...
  } else {
    router?.replace('/login')
    setAuthenticated(false);
    // User is signed out
    // ...
  }
})

useEffect(()=>{
  if(authenticated==fasle){
    router.replace('/login')
  }
},[authenticated])*/
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          tabBarLabel: 'Add New',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
