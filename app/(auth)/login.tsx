
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const AnimatedView = Animated.View;
const AnimatedImage = Animated.createAnimatedComponent(Image);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logoScale = useSharedValue(0);
  const formTranslateY = useSharedValue(500);
  const formOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    formTranslateY.value = withTiming(0, { duration: 800 });
    formOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }
    setLoading(true);
    router.push("/(dashboard)/home");
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <View className="flex-1 bg-yellow-400 items-center justify-center px-4">
      {/* Logo */}
      <Image
        source={require("../../assets/logo.png")}
        className="w-40 h-40 mb-8"
      />

      {/* Form Container */}
      <View className="w-full bg-white rounded-2xl p-6 shadow-lg">
        <Text className="text-2xl font-bold text-gray-900 text-center mb-1">
          Welcome Back
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Login to your account
        </Text>

        {/* Email Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-4">
          <Ionicons name="mail-outline" size={20} color="gray" />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            className="ml-3 flex-1 text-gray-900"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-6">
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="ml-3 flex-1 text-gray-900"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-yellow-500 rounded-xl py-3 items-center mb-4"
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text className="text-yellow-500 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
