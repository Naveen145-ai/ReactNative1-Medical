import { View, Text,Image } from 'react-native'
import React from 'react'
import { getLocalStorage } from '../service/Storage'
import Feather from '@expo/vector-icons/Feather';
//import Colors from '../../constant/Colors'

export default function Header() {

    const [user,setUser] = useState();

    useEffect(()=>{
        GetUserDetail();
    },[])

    const GetUserDetail=async()=>{
        const userInfo=await getLocalStorage('userDetail');
        console.log(userInfo);
        setUser(userInfo);
        
    }
  return (
    <View style={{
      marginTop:20
    }}>

      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
          width:'100%'
      }}>

      
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,

            

        }}>
      <Image source={require('./../assets/images/medical.png')}
      style={{
        width:45,
        height:45
      }}
      />

      <Text stylele={{
        fontSize:25,
        fontWeight:'bold'
      }}>Hello {user.displayName} 👋</Text>
      </View>
      <Feather name="settings" size={34} color={Colors.DARK_GRAY} />

      </View>
    </View>
  )
}