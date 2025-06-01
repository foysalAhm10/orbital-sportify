import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AuthContextProvider, useAuth } from '@/context/authContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native';

const profile = () => {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  console.log("user data: ", user);

  return (
      <View style={{ paddingTop: hp(12), paddingHorizontal: wp(5) }} className="flex-1 gap-12 " >
        <Text>Profile</Text>
        <Button title = "Logout" onPress={handleLogout}/>
      </View>
  )
}

export default profile;