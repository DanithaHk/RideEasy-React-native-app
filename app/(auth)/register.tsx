import { useAuth } from "@/context/AuthContext"; // use auth context
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!name || !address || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      // Call register from AuthContext
      const res = await register(email, password, name);

      if (res.success) {
        alert("Registration successful!");
        router.push("/(auth)/drivingLicence");
      } else {
        alert(res.msg || "Registration failed.");
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#fcb43c] px-4">
      <View className="bg-white w-80 rounded-2xl p-6 shadow-lg">
        <Text className="text-center text-lg font-semibold text-gray-700 mb-6">
          Register
        </Text>

        {/* Full Name */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 py-2"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Address */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="location-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 py-2"
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Email */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="mail-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 py-2"
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 py-2"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 py-2"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-yellow-500 rounded-full py-3 mb-4"
          onPress={handleNext}
        >
          <Text className="text-center text-white font-bold text-base">
            {loading ? "Loading..." : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Redirect to Login */}
      <View className="mt-6 flex-row">
        <Text className="text-white">Have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-white font-semibold">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
