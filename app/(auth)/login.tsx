import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);
      if (res?.success) {
        router.replace("/home");
      } else {
        Alert.alert("Login Failed", res?.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Login Error", "Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-yellow-400 items-center justify-center px-4">
      {/* Logo */}
      <Image
        source={require("../../assets/logo.png")}
        className="w-40 h-40 mb-8"
        resizeMode="contain"
      />

      {/* Form */}
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
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
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
            autoCapitalize="none"
            autoCorrect={false}
            className="ml-3 flex-1 text-gray-900"
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className={`rounded-xl py-3 items-center mb-4 ${
            loading ? "bg-yellow-400" : "bg-yellow-500"
          }`}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-base">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-4">
              <Text className="text-gray-500">{"Don't have an account? "}</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-yellow-500 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;