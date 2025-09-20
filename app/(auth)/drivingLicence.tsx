// import { db } from "@/firebase";
// import { getData, removeData } from "@/utility/storage";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import { doc, setDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   Platform,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from "react-native-reanimated";

// const AnimatedView = Animated.View;
// const AnimatedImage = Animated.createAnimatedComponent(Image);

// const DrivingLicence = () => {
//   const [licenceNumber, setLicenceNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [licenceImage, setLicenceImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState<any>(null);

//   const router = useRouter();

//   const logoScale = useSharedValue(0);
//   const buttonScale = useSharedValue(1);

//   const animatedLogoStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: logoScale.value }],
//   }));

//   const animatedButtonStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: buttonScale.value }],
//   }));

//   useEffect(() => {
//     logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });

//     const fetchUserData = async () => {
//       try {
//         const userDataString = await getData("users");
//         if (userDataString) setUserData(JSON.parse(userDataString));
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Required", "We need access to your gallery.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) setLicenceImage(result.assets[0].uri);
//   };

//   const uploadImageToCloudinary = async (imageUri: string) => {
//     const formData = new FormData();
//     let file: any;
//     if (Platform.OS === "web") {
//       const response = await fetch(imageUri);
//       const blob = await response.blob();
//       file = new File([blob], "licence.jpg", { type: "image/jpeg" });
//     } else {
//       file = { uri: imageUri, type: "image/jpeg", name: "licence.jpg" };
//     }
//     formData.append("file", file);
//     formData.append("upload_preset", "user_licences");

//     try {
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dfswndziq/image/upload",
//         { method: "POST", body: formData }
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error?.message || "Upload failed");
//       return data.secure_url;
//     } catch (err) {
//       console.error("Cloudinary upload error:", err);
//       return null;
//     }
//   };

//   const handleSubmit = async () => {
//     if (!licenceNumber || !expiryDate || !licenceImage) {
//       Alert.alert("Error", "Please fill all fields and upload your licence.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const imageUrl = await uploadImageToCloudinary(licenceImage);
//       if (!imageUrl) {
//         setLoading(false);
//         Alert.alert("Error", "Image upload failed.");
//         return;
//       }

//       await setDoc(doc(db, "users", userData.uid), {
//         ...userData,
//         licenceNumber,
//         expiryDate,
//         licenceImage: imageUrl,
//       });

//       await removeData("users");
//       setLoading(false);
//       router.push("/(dashboard)/home");
//     } catch (err) {
//       setLoading(false);
//       console.error(err);
//       Alert.alert("Error", "Failed to save licence details.");
//     }
//   };

//   return (
//     <View className="flex-1 justify-center px-6 bg-[#fcb43c]">
//       <TouchableOpacity
//         className="absolute top-12 left-6 bg-white rounded-full p-2 shadow-lg"
//         onPress={() => router.back()}
//       >
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       <View className="items-center">
//         <AnimatedImage
//           source={require("../../assets/driving_licence-removebg-preview.png")}
//           style={[{ width: 250, height: 250, marginTop: 50 }, animatedLogoStyle]}
//         />
//       </View>

//       <Text className="text-center text-lg font-semibold text-gray-700 mb-6 mt-6">
//         Add Driving Licence.
//       </Text>

//       <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4 bg-white">
//         <Ionicons name="card-outline" size={20} color="gray" />
//         <TextInput
//           className="flex-1 ml-2 py-2"
//           placeholder="Licence Number"
//           value={licenceNumber}
//           onChangeText={setLicenceNumber}
//         />
//       </View>

//       <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4 bg-white">
//         <Ionicons name="calendar-outline" size={20} color="gray" />
//         <TextInput
//           className="flex-1 ml-2 py-2"
//           placeholder="Expiry Date (YYYY-MM-DD)"
//           value={expiryDate}
//           onChangeText={setExpiryDate}
//         />
//       </View>

//       <TouchableOpacity
//         onPress={pickImage}
//         className="border border-gray-300 rounded-lg p-4 mb-4 bg-white flex-row items-center justify-center"
//       >
//         <Ionicons name="cloud-upload-outline" size={22} color="gray" />
//         <Text className="ml-2 text-gray-600 font-medium">
//           {licenceImage ? "Change Image" : "Upload Driving Licence"}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         className="bg-white rounded-full py-3 mb-4"
//         onPress={handleSubmit}
//         onPressIn={() => (buttonScale.value = withTiming(0.95))}
//         onPressOut={() => (buttonScale.value = withSpring(1))}
//       >
//         <AnimatedView style={animatedButtonStyle}>
//           <Text className="text-center text-black font-bold text-base">
//             {loading ? "Loading..." : "Register"}
//           </Text>
//         </AnimatedView>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DrivingLicence;


import { useAuth } from "@/context/AuthContext"; // <-- AuthContext
import { db } from "@/firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const AnimatedView = Animated.View;
const AnimatedImage = Animated.createAnimatedComponent(Image);

const DrivingLicence = () => {
  const { user, updateUserData } = useAuth();
  const router = useRouter();

  const [licenceNumber, setLicenceNumber] = useState(user?.licenceNumber ?? "");
  const [expiryDate, setExpiryDate] = useState(user?.expiryDate ?? "");
  const [licenceImage, setLicenceImage] = useState<string | null>(user?.licenceImage ?? null);
  const [loading, setLoading] = useState(false);

  const logoScale = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) setLicenceImage(result.assets[0].uri);
  };

  const uploadImageToCloudinary = async (imageUri: string) => {
    const formData = new FormData();
    let file: any;
    if (Platform.OS === "web") {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      file = new File([blob], "licence.jpg", { type: "image/jpeg" });
    } else {
      file = { uri: imageUri, type: "image/jpeg", name: "licence.jpg" };
    }
    formData.append("file", file);
    formData.append("upload_preset", "user_licences");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfswndziq/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!licenceNumber || !expiryDate || !licenceImage) {
      Alert.alert("Error", "Please fill all fields and upload your licence.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not found.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = licenceImage.startsWith("http") ? licenceImage : await uploadImageToCloudinary(licenceImage);
      if (!imageUrl) {
        setLoading(false);
        Alert.alert("Error", "Image upload failed.");
        return;
      }

      // Update user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        ...user,
        licenceNumber,
        expiryDate,
        licenceImage: imageUrl,
      });

      // Update user in context
      await updateUserData(user.uid);

      setLoading(false);
      router.push("/(dashboard)/home");
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert("Error", "Failed to save licence details.");
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-[#fcb43c]">
      <TouchableOpacity
        className="absolute top-12 left-6 bg-white rounded-full p-2 shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="items-center">
        <AnimatedImage
          source={require("../../assets/driving_licence-removebg-preview.png")}
          style={[{ width: 250, height: 250, marginTop: 50 }, animatedLogoStyle]}
        />
      </View>

      <Text className="text-center text-lg font-semibold text-gray-700 mb-6 mt-6">
        Add Driving Licence.
      </Text>

      <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4 bg-white">
        <Ionicons name="card-outline" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 py-2"
          placeholder="Licence Number"
          value={licenceNumber}
          onChangeText={setLicenceNumber}
        />
      </View>

      <View className="flex-row items-center border border-gray-300 rounded-full px-3 mb-4 bg-white">
        <Ionicons name="calendar-outline" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 py-2"
          placeholder="Expiry Date (YYYY-MM-DD)"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
      </View>

      <TouchableOpacity
        onPress={pickImage}
        className="border border-gray-300 rounded-lg p-4 mb-4 bg-white flex-row items-center justify-center"
      >
        <Ionicons name="cloud-upload-outline" size={22} color="gray" />
        <Text className="ml-2 text-gray-600 font-medium">
          {licenceImage ? "Change Image" : "Upload Driving Licence"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white rounded-full py-3 mb-4"
        onPress={handleSubmit}
        onPressIn={() => (buttonScale.value = withTiming(0.95))}
        onPressOut={() => (buttonScale.value = withSpring(1))}
      >
        <AnimatedView style={animatedButtonStyle}>
          <Text className="text-center text-black font-bold text-base">
            {loading ? "Loading..." : "Register"}
          </Text>
        </AnimatedView>
      </TouchableOpacity>
    </View>
  );
};

export default DrivingLicence;
