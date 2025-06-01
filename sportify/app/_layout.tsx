import { Redirect, Stack, useSegments } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./globals.css";
import { useEffect } from "react";
import { AuthContextProvider } from "@/context/authContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { Slot } from "expo-router";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      router.replace("/(tabs)");
    } else if (isAuthenticated == false) {
      router.replace("/signin");
    }
  }, [isAuthenticated]);
  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  )
}

/*
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <Stack initialRouteName="StartPage">
          <Stack.Screen
            name="StartPage"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signin"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}
*/
