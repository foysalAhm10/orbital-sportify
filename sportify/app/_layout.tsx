import { useSegments } from "expo-router";
import "./globals.css";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "@/context/authContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import { Slot } from "expo-router";
import { View } from "react-native";
import Loading from "@/components/loading";
import React from "react";

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    setHasMounted(true); // now we're sure we can use router
  }, []);

  useEffect(() => {
     if (!hasMounted || loading) return; // wait for mount & loading complete
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated && inApp) {
      router.replace("/signin");
    }
  }, [hasMounted, loading, isAuthenticated, segments]);

  if (!hasMounted || loading || typeof isAuthenticated === "undefined") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading size={150} />
      </View>
    );
  }

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
