import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Loading from '@/components/loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      return router.replace('/signin');
    }, 2000); // 2000ms = 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Sportify</Text>
      <Loading size={hp(8)} />
      <Text style={{ marginTop: 20 }}>Loading...</Text>
    </View>
  );
}