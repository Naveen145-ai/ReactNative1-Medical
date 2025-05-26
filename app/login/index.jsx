import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Image
          source={require('./../../assets/images/login.png')}
          style={styles.image}
        />
      </View>
      <View style={{ padding: 25, backgroundColor: Colors.PRIMARY, height: '100%' }}>
        <Text style={styles.title}>Stay on Track, Stay Healthy!</Text>
        <Text style={styles.subtitle}>
          Track your meds, take control of your health. Stay consistent, stay confident.
        </Text>

        {/* Navigate to the tabs screen after login */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace('login/signIn')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={{ color: 'white', marginTop: 4 }}>
          Note: By clicking continue
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
  },
  button: {
    marginTop: 30,
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
});
