import { LoaderContext, LoaderProvider } from "@/context/LoaderContext";
import { Slot } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import '../global.css';
export const SplashScreen = () => {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Animatable.Image
                animation="lightSpeedOut"
                duration={2500}
                source={require("../assets/logo.png")}
                className="w-40 h-40 mb-4"
                resizeMode="contain"
                />
            <Text className="text-black text-2xl font-bold">RideEase</Text>
              <ActivityIndicator className="mt-3" size="large" />
        </View>
    );
}
const RootContent = () => {
  const { isLoading, setLoading } = useContext(LoaderContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <SplashScreen /> : <Slot />;
};


const RootLayout = () => {

    return(
        <LoaderProvider>
            <RootContent />
        </LoaderProvider>
    )
}
export default RootLayout