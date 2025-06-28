import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Octicons, MaterialIcons } from '@expo/vector-icons';

import { supabase } from '@/lib/supabase';
import Loading from '@/components/loading';

export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Login", "Please enter both username and password.");
      return;
    }

    setLoading(true);

    // 1. Lookup the email from `profiles` using username
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', username.trim().toLowerCase())
      .single();

    if (error || !profile?.email) {
      setLoading(false);
      Alert.alert("Login Error", "Incorrect username or password."); // Username not found but we do not want others to know what the issue is.
      return;
    }

    // 2. Sign in using email from profiles
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password,
    });

    setLoading(false);

    if (signInError) {
      Alert.alert("Login Error", "Incorrect username or password."); // Incorrect password but we do not want others to know what the issue is.
    } else {
      // Alert.alert("Welcome back!");
      router.replace('/');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.bannerContainer}>
          <Text style={styles.loginBanner}>
            SPORTIFY
          </Text>
          <Text style={styles.taglineText}>
            Game On. Anytime. Anywhere.
          </Text>
        </View>

        <View style={{ top: 15 }}>
          <Text style={styles.headerText}>Log In</Text>
        </View>

        <View style={styles.inputGroup}>

          <View style={styles.inputRow}>
            <Octicons name="person" size={20} color="grey" />
            <TextInput
              placeholder="Username"
              placeholderTextColor="grey"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View>
            <View style={styles.inputRow}>
              <MaterialIcons name="password" size={20} color="grey" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="grey"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading size={50} />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push('/signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#245E87',
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 40,
  },
  bannerContainer: {
    bottom: 10,
    alignItems: 'center',
  },
  loginBanner: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: Platform.select({
      ios: 'Marker Felt',
      android: 'casual',
    }),
  },
  taglineText: {
    fontSize: 16,
    color: '#F4C542',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Lato_400Regular',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  inputGroup: {
    gap: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#e5e5e5',
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
    fontWeight: '600',
  },
  button: {
    height: 48,
    backgroundColor: '#1e3a8a',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#7a7a7a',
    fontWeight: '600',
  },
  footerLink: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
});
