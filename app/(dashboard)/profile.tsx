import { useAuth } from "@/context/AuthContext";
import { updateUserProfileData } from "@/services/profileService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const { user , setUser } = useAuth();

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);

  // Editable fields
  const [editName, setEditName] = useState<string>(user?.name ?? "");
  const [editEmail, setEditEmail] = useState<string>(user?.email ?? "");
  const [editLicenceNumber, setEditLicenceNumber] = useState<string>(
    user?.licenceNumber ?? ""
  );

  const [editExpiryDate, setEditExpiryDate] = useState<string>(
    user?.expiryDate ?? ""
  );
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  // Animation refs
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Modal open / close animation
  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  // Keyboard handling
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardOffset, {
        toValue: -e.endCoordinates.height / 2,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, []);

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const editPersonalData = () => {
    
    setEditName(user.name ?? "");
    setEditEmail(user.email ?? "");
    setEditLicenceNumber(user.licenceNumber ?? "");
    setEditExpiryDate(user.expiryDate ?? "");
    setCurrentPassword("");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveProfile = async () => {
  if (!editName || !editEmail || !editLicenceNumber || !editExpiryDate || !currentPassword) {
    Alert.alert("Error", "Please fill all fields before saving.");
    return;
  }

  setLoading(true);
  try {
    const updatedUser = await updateUserProfileData({
      name: editName,
      licenceNumber: editLicenceNumber,
      expiryDate: editExpiryDate,
    });

    // update user in AuthContext
    setUser(updatedUser , user.licenceImage);

    Alert.alert("Success", "Profile updated successfully!");
    setModalVisible(false);
  } catch (error: any) {
    Alert.alert("Error", error.message || "Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white/80 p-4 shadow">
        <Text className="text-xl font-bold text-center text-gray-900">
          Profile
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="items-center gap-4 p-6">
          <View className="relative">
            <Image
              source={{ uri: user.profileImage ?? "https://via.placeholder.com/150" }}
              className="h-28 w-28 rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-md"
            >
              <MaterialIcons name="edit" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="text-center">
            <Text className="text-2xl font-bold text-gray-900">{user.name}</Text>
          </View>
        </View>

        <View className="space-y-6 px-4">
          {/* Personal Information */}
          <View className="rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between pb-4">
              <Text className="text-lg font-bold text-gray-900">
                Personal Information
              </Text>
              <TouchableOpacity onPress={editPersonalData}>
                <Text className="font-semibold text-red-600">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-500">Full Name</Text>
                <Text className="text-base text-gray-800">{user.name}</Text>
              </View>
              <View>
                <Text className="text-sm mt-2 font-medium text-gray-500">
                  Email Address
                </Text>
                <Text className="text-base text-gray-800">{user.email}</Text>
              </View>
            </View>
          </View>

          {/* License Information */}
          <View className="rounded-xl bg-white p-4 shadow-sm">
            <Text className="text-lg font-bold text-gray-900 pb-4">
              Licence Information
            </Text>
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-500">Licence Number</Text>
                <Text className="text-base text-gray-800">{user.licenceNumber}</Text>
              </View>
              <View>
                <Text className="text-sm mt-2 font-medium text-gray-500">Expiry Date</Text>
                <Text className="text-base text-gray-800">{user.expiryDate}</Text>
              </View>
              <View className="border-t border-gray-200 pt-4">
                <Text className="text-sm font-medium text-gray-500">Licence Image</Text>
                <View className="mt-2 flex-row items-center gap-4">
                  <View className="h-20 w-32 items-center justify-center rounded-lg bg-gray-100">
                    <Image
                      source={{ uri: user.licenceImage }}
                      className="h-20 w-32 rounded-lg"
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity className="mt-4 flex-row items-center justify-center gap-2 mb-3 rounded-xl bg-white p-4 shadow-sm">
            <MaterialIcons name="logout" size={20} color="#dc2626" />
            <Text className="font-semibold text-red-600">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      {/* Edit Profile Modal */}
        <Modal
          animationType="none"
          transparent
          visible={modalVisible}
          onRequestClose={closeModal}
          statusBarTranslucent
        >
          <Animated.View
            style={{ flex: 1, opacity: fadeAnim }}
            className="justify-center items-center"
          >
            {/* Backdrop */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeModal}
              className="absolute inset-0 bg-white" 
            />

            {/* Modal Content */}
            <Animated.View
              style={{
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                  { translateY: keyboardOffset },
                ],
              }}
              className="bg-white w-11/12 max-w-md rounded-2xl mx-4 overflow-hidden"
            >
              {/* Header */}
              <View className="bg-white px-6 py-4 flex-row items-center justify-between border-b border-gray-00">
                <Text className="text-gray-900 text-xl font-bold">Edit Profile</Text>
                <TouchableOpacity
                  onPress={closeModal}
                  className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                  activeOpacity={1}
                >
                  <Ionicons name="close" size={18} color="black" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View className="p-6">
                {/* Name */}
                <TextInput
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Full Name"
                  className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
                />

                {/* License Number */}
                <TextInput
                  value={editLicenceNumber}
                  onChangeText={setEditLicenceNumber}
                  placeholder="Licence Number"
                  className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
                />

                {/* Expiry Date */}
                <TextInput
                  value={editExpiryDate}
                  onChangeText={setEditExpiryDate}
                  placeholder="MM/DD/YYYY"
                  className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
                />

                {/* Current Password */}
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Current Password"
                  secureTextEntry
                  className="border  border-gray-200 rounded-xl px-4 py-3 mb-6"
                />

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={closeModal}
                    className="flex-1 bg-gray-100 py-4 rounded-xl border border-gray-200"
                    disabled={loading}
                  >
                    <Text className="text-gray-700 font-semibold text-center">
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={saveProfile}
                    className={`flex-1 py-4 rounded-xl ${loading ? "bg-red-400" : "bg-red-500"}`}
                    disabled={loading}
                  >
                    <Text className="text-white font-semibold text-center">
                      {loading ? "Saving..." : "Save Changes"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>

    </SafeAreaView>
  );
};

export default ProfileScreen;
