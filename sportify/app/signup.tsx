import { View, Text } from 'react-native'
import React, { use } from 'react'
//signup imports and code below
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
//import signup from '../signup';
import { useRef, useState } from 'react';
import { TextInput, TouchableOpacity, Pressable, Alert, Image } from 'react-native';
import Loading from '@/components/loading'; // Assuming you have a Loading component
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext'; // Assuming you have a useAuth hook for authentication

export default function Signup() {
    const router = useRouter();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);


    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");


    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
            Alert.alert("Sign Up", "Please fill in all fields!");
            return;
        }
        setLoading(true);

        //Register process
        let response = await register(emailRef.current, passwordRef.current, usernameRef.current);
        setLoading(false);

        console.log("response :", response);
        if (!response.success) {
            Alert.alert("Sign Up", response.msg)
        }

    }

    return (

        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }} className="flex-1 gap-12 ">
                <View className="items-center">
                    <Image style={{ height: hp(12) }} resizeMode="contain" source={require('@/assets/images/login.png')} />
                </View>


                <View className="gap-10">
                    <Text style={{ fontSize: hp(3) }} className="font-bold tracking wider text-center text-neutral-800">Sign Up</Text>
                    {/*inputs */}
                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-2xl">
                            <FontAwesome5 name="user-circle" size={hp(2.9)} color="grey" />
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="Username"
                                placeholderTextColor="grey"
                            />
                        </View>

                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-2xl">
                            <Octicons name="mail" size={hp(2.7)} color="grey" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="Email"
                                placeholderTextColor="grey"
                            />
                        </View>

                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-200 items-center rounded-2xl">
                            <MaterialIcons name="password" size={hp(2.7)} color="grey" />
                            <TextInput
                                onChangeText={value => passwordRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="Password"
                                placeholderTextColor="grey"
                                secureTextEntry={true}
                            />
                        </View>


                        {/* Sign in button*/}
                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center items-center">
                                        <Loading size={hp(8)} />
                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5) }} className="bg-blue-800 rounded-xl justify-center items-center">
                                        <Text style={{ fontSize: hp(2.8) }} className="text-white font-bold tracking-wider" >
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>


                        {/* Sign up text */}

                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500" > Already have an account? </Text>
                            <Pressable onPress={() => router.push("/signin")} >
                                <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-indigo-500" >Log In</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </View>
        </CustomKeyboardView>

    )
}
