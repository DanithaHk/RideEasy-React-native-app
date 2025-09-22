// // import { AuthProvider } from "@/context/AuthContext";
// // import { LoaderContext, LoaderProvider } from "@/context/LoaderContext";
// // import { Slot, router } from "expo-router";
// // import { useContext, useEffect } from "react";
// // import { ActivityIndicator, Text, View } from "react-native";
// // import * as Animatable from "react-native-animatable";
// // import '../global.css';

// // export const SplashScreen = () => (
// //   <View className="flex-1 justify-center items-center bg-white">
// //     <Animatable.Image
// //       animation="lightSpeedOut"
// //       duration={2500}
// //       source={require("../assets/logo.png")}
// //       className="w-40 h-40 mb-4"
// //       resizeMode="contain"
// //     />
// //     <Text className="text-black text-2xl font-bold">RideEase</Text>
// //     <ActivityIndicator className="mt-3" size="large" />
// //   </View>
// // );

// // const RootContent = () => {
// //   const { isLoading, setLoading } = useContext(LoaderContext);

// //   useEffect(() => {
// //     const timer = setTimeout(async () => {
// //       const token = false; // Replace with real auth check (SecureStore/Firebase)
      
// //       if (token) router.replace("/(dashboard)/home");
// //       else router.replace("/(auth)/login");

// //       setLoading(false);
// //     }, 2000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   return  <Slot />;
// // };

// // export default function RootLayout() {
// //   return (
// //     <LoaderProvider>
// //       <AuthProvider>
// //         <RootContent />
// //       </AuthProvider>
// //     </LoaderProvider>
// //   );
// // }

// import { AuthProvider, useAuth } from "@/context/AuthContext";
// import { LoaderContext, LoaderProvider } from "@/context/LoaderContext";
// import { Slot, router } from "expo-router";
// import { useContext, useEffect } from "react";
// import { ActivityIndicator, Text, View } from "react-native";
// import * as Animatable from "react-native-animatable";
// import '../global.css';

// // Splash Screen Component
// const SplashScreen = () => (
//   <View className="flex-1 justify-center items-center bg-white">
//     <Animatable.Image
//       animation="bounceIn"
//       duration={1500}
//       source={require("../assets/logo.png")}
//       className="w-40 h-40 mb-4"
//       resizeMode="contain"
//     />
//     <Text className="text-black text-2xl font-bold">RideEase</Text>
//     <ActivityIndicator className="mt-3" size="large" />
//   </View>
// );

// // Root Content to handle splash + routing
// const RootContent = () => {
//   const { isLoading, setLoading } = useContext(LoaderContext);
//   const user = useAuth();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // After 2 seconds, navigate to login page
//       console.log("in root layoutNavigating to Login Screen");
//       console.log(user);
//       router.push("/login");
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   },  []);

//   return   <Slot />;
// };

// // Layout wrapper
// export default function RootLayout() {
//   console.log("RootLayout Rendered");
  
//   return (
//     <LoaderProvider>
//       <AuthProvider>
//         <RootContent />
//       </AuthProvider>
//     </LoaderProvider>
//   );
// }

import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./../global.css";

const RootLayout = () => {
  const theme = useColorScheme();

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className={`flex-1 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <LoaderProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios_from_right"
            }}
          >
            <Stack.Screen name="(dashboard)" />
            
          </Stack>
        </AuthProvider>
      </LoaderProvider>
    </SafeAreaView>
  );
};

export default RootLayout;