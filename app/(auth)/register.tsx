// import { auth, db } from "@/firebase";
// import { saveData } from "@/utility/storage";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, setDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from "react-native-reanimated";

// const AnimatedView = Animated.View;

// const Register = () => {
//   const router = useRouter();
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const logoScale = useSharedValue(0);
//   const formTranslateY = useSharedValue(500);
//   const formOpacity = useSharedValue(0);
//   const buttonScale = useSharedValue(1);

//   useEffect(() => {
//     logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });
//     formTranslateY.value = withTiming(0, { duration: 800 });
//     formOpacity.value = withTiming(1, { duration: 800 });
//   }, []);

//   const animatedFormStyle = useAnimatedStyle(() => ({
//     opacity: formOpacity.value,
//     transform: [{ translateY: formTranslateY.value }],
//   }));

//   const animatedButtonStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: buttonScale.value }],
//   }));

//   const handleNext = async () => {
//     if (!name || !address || !email || !password || !confirmPassword) {
//       alert("Please fill out all fields.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredentials.user;

//       await setDoc(doc(collection(db, "users"), user.uid), {
//         name,
//         address,
//         email,
//         createdAt: new Date().toISOString(),
//       });

//       await saveData("users", JSON.stringify({ uid: user.uid, name, email, address }));

//       setLoading(false);
//       alert("Registration successful!");
//       router.push("/(auth)/drivingLicence");
//     } catch (error: any) {
//       setLoading(false);
//       alert(error.message);
//       console.error(error);
//     }
//   };

//   return (
//     <View className="flex-1 justify-center items-center bg-[#fcb43c] px-4">
//       <AnimatedView className="bg-white w-80 rounded-2xl p-6 shadow-lg" style={animatedFormStyle}>
//         <Text className="text-center text-lg font-semibold text-gray-700 mb-6">Register</Text>

//         <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
//           <Ionicons name="person-outline" size={20} color="gray" />
//           <TextInput className="flex-1 ml-2 py-2" placeholder="Full Name" value={name} onChangeText={setName} />
//         </View>

//         <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
//           <Ionicons name="location-outline" size={20} color="gray" />
//           <TextInput className="flex-1 ml-2 py-2" placeholder="Address" value={address} onChangeText={setAddress} />
//         </View>

//         <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
//           <Ionicons name="mail-outline" size={20} color="gray" />
//           <TextInput
//             className="flex-1 ml-2 py-2"
//             placeholder="Email Address"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
//           <Ionicons name="lock-closed-outline" size={20} color="gray" />
//           <TextInput
//             className="flex-1 ml-2 py-2"
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//         </View>

//         <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
//           <Ionicons name="lock-closed-outline" size={20} color="gray" />
//           <TextInput
//             className="flex-1 ml-2 py-2"
//             placeholder="Confirm Password"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//         </View>

//         <TouchableOpacity
//           className="bg-yellow-500 rounded-full py-3 mb-4"
//           onPress={handleNext}
//           onPressIn={() => (buttonScale.value = withTiming(0.95))}
//           onPressOut={() => (buttonScale.value = withSpring(1))}
//         >
//           <AnimatedView style={animatedButtonStyle}>
//             <Text className="text-center text-white font-bold text-base">{loading ? "Loading..." : "Next"}</Text>
//           </AnimatedView>
//         </TouchableOpacity>
//       </AnimatedView>

//       <View className="mt-6 flex-row">
//         <Text className="text-white">Have an account? </Text>
//         <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
//           <Text className="text-white font-semibold">Log In</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Register;

import { useAuth } from "@/context/AuthContext"; // use auth context
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const AnimatedView = Animated.View;

const Register = () => {
  const router = useRouter();
  const { register } = useAuth(); // <-- use register from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const logoScale = useSharedValue(0);
  const formTranslateY = useSharedValue(500);
  const formOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    formTranslateY.value = withTiming(0, { duration: 800 });
    formOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedFormStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

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
      <AnimatedView className="bg-white w-80 rounded-2xl p-6 shadow-lg" style={animatedFormStyle}>
        <Text className="text-center text-lg font-semibold text-gray-700 mb-6">Register</Text>

        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput className="flex-1 ml-2 py-2" placeholder="Full Name" value={name} onChangeText={setName} />
        </View>

        <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4">
          <Ionicons name="location-outline" size={20} color="gray" />
          <TextInput className="flex-1 ml-2 py-2" placeholder="Address" value={address} onChangeText={setAddress} />
        </View>

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

        <TouchableOpacity
          className="bg-yellow-500 rounded-full py-3 mb-4"
          onPress={handleNext}
          onPressIn={() => (buttonScale.value = withTiming(0.95))}
          onPressOut={() => (buttonScale.value = withSpring(1))}
        >
          <AnimatedView style={animatedButtonStyle}>
            <Text className="text-center text-white font-bold text-base">{loading ? "Loading..." : "Next"}</Text>
          </AnimatedView>
        </TouchableOpacity>
      </AnimatedView>

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
