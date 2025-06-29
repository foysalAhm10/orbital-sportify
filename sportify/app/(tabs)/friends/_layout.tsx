import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FriendsLayout() {
    return (
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
    );
}
