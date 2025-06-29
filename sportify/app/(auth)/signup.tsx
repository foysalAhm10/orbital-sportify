import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Octicons, MaterialIcons } from '@expo/vector-icons';

import { supabase } from '@/lib/supabase';
import Loading from '@/components/loading';
import React from 'react';

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !username) {
            Alert.alert('Sign Up', 'Please fill in all fields!');
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert('Sign Up Error', error.message);
            setLoading(false);
            return;
        }

        const user = data?.user;

        if (user) {
            // Insert extra data into `profiles`
            const { error: profileError } = await supabase.from('profiles').insert([
                {
                    id: user.id, // match with auth.users
                    username: username,
                    email: email,
                },
            ]);

            if (profileError) {
                Alert.alert('Profile Error', profileError.message);
            } else {
                Alert.alert('Account created!', 'Welcome to Sportify!');
                router.replace('/');
            }
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.content}>
                <View style={styles.bannerContainer}>
                    <Text style={styles.loginBanner}>
                        SPORTIFY
                    </Text>
                    <Text style={styles.taglineText}>
                        Game On. Anytime. Anywhere.
                    </Text>
                </View>

                <Text style={styles.headerText}>Sign Up</Text>

                <View style={styles.inputGroup}>

                    <View style={styles.inputRow}>
                        <Octicons name="person" size={20} color="grey" />
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Username"
                            placeholderTextColor="grey"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <Octicons name="mail" size={20} color="grey" />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            placeholderTextColor="grey"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <MaterialIcons name="password" size={20} color="grey" />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password (at least 6 characters)"
                            placeholderTextColor="grey"
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <Loading size={50} />
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <Pressable onPress={() => router.push('/signin')}>
                            <Text style={styles.footerLink}>Log In</Text>
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
        paddingHorizontal: 24,
        paddingTop: 80,
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
            android: 'casual', // fallback
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
