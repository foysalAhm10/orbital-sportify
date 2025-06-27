import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';

export default function Profile() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logged out', 'You have been successfully logged out.');
      router.replace('/signin'); // Redirect to sign-in page after logout
    } catch (err) {
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerText}>Profile</Text>

      <Text style={styles.userEmail}>Signed in as: {user?.email || 'No email found'}</Text>

      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#6498BF"
        style={styles.button}
        onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#A2BFCA',
    paddingTop: 80,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});