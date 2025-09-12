import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ProfileScreen = () => {
  const user = {
    name: "Sophia Carter",
    joined: "Joined in 2021",
    email: "sophia.carter@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA 12345",
    licenseNumber: "S123-456-7890",
    expiryDate: "12/2026",
    licenseImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPsfrTpweDDX2RNpZRxbn43sFHWcTf4ahNSHhB7ggOCLlkBYCwZSWDA4b8c0rrTHHOSHKUPvloePdxOUQMMChQMFgUHiSiHBt_aaQK29gKIpXd67VKvIv888FOCcytJ0v_n5J5cRV3TCFCc-_qHlI61roHnUmd344mZBxxrrumH0-d-C9cSVW49CgdH4yB3CGvf7VIWSdUey7ZN8V6b3lk32r0GqgdQWt_phabJ7LhFMel5xkCWD43VMFaVe_dx9TMrZFdqzV8ePyC",
  };

  
    const editPersonalData = () => {    
    }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
     
      <View className="bg-white/80 p-4 shadow">
        <Text className="text-xl font-bold text-center text-gray-900">
          Profile
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        <View className="items-center gap-4 p-6">
          <View className="relative">
            <Image
              source={{ uri: user.licenseImage }}
              className="h-28 w-28 rounded-full"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-md">
              <MaterialIcons name="edit" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="text-center">
            <Text className="text-2xl font-bold text-gray-900">
              {user.name}
            </Text>
            
          </View>
        </View>

        <View className="space-y-6 px-4">
          {/* Personal Information */}
          <View className="rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between pb-4">
              <Text className="text-lg font-bold text-gray-900">
                Personal Information
              </Text>
              <TouchableOpacity>
                <Text className="font-semibold  text-red-600" onPress={editPersonalData}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-500">
                  Full Name
                </Text>
                <Text className="text-base  text-gray-800">{user.name}</Text>
              </View>
              <View>
                <Text className="text-sm mt-2 font-medium text-gray-500">
                  Email Address
                </Text>
                <Text className="text-base text-gray-800">{user.email}</Text>
              </View>
              <View>
                <Text className="text-sm mt-2 font-medium text-gray-500">
                  Phone Number
                </Text>
                <Text className="text-base text-gray-800">{user.phone}</Text>
              </View>
              <View className="border-t border-gray-200 pt-4">
                <Text className="text-sm font-medium text-gray-500">
                  Address
                </Text>
                <Text className="text-base mb-2 text-gray-800">{user.address}</Text>
              </View>
            </View>
          </View>

          {/* License Information */}
          <View className="rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between pb-4">
              <Text className="text-lg font-bold text-gray-900">
                Licence Information
              </Text>
              
            </View>
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-500">
                  Licence Number
                </Text>
                <Text className="text-base text-gray-800">
                  {user.licenseNumber}
                </Text>
              </View>
              <View>
                <Text className="text-sm mt-2 font-medium text-gray-500">
                  Expiry Date
                </Text>
                <Text className="text-base text-gray-800">
                  {user.expiryDate}
                </Text>
              </View>
              <View className="border-t border-gray-200 pt-4">
                <Text className="text-sm font-medium text-gray-500">
                  Licence Image
                </Text>
                <View className="mt-2 flex-row items-center gap-4">
                  <View className="h-20 w-32 items-center justify-center rounded-lg bg-gray-100">
                    <Image
                      source={{ uri: user.licenseImage }}
                      className="h-20 w-32 rounded-lg"
                      resizeMode="cover"
                    />
                  </View>
                  
                </View>
              </View>
            </View>
          </View>

          

          {/* Logout Button */}
          <TouchableOpacity className="mt-4 flex-row items-center justify-center gap-2 rounded-xl bg-white p-4 shadow-sm">
            <MaterialIcons name="logout" size={20} color="#dc2626" />
            <Text className="font-semibold text-red-600">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
