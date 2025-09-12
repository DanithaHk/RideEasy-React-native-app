import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import * as Animatable from "react-native-animatable";

const featuredCars = [
  {
    id: 1,
    name: "Porsche 911",
    price: 85,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=porsche&model=911",
  },
  {
    id: 2,
    name: "Ford Mustang",
    price: 60,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=ford&model=mustang",
  },
  {
    id: 3,
    name: "Audi R8",
    price: 110,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=audi&model=r8",
  },
];

const availableCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    price: 45,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=tesla&model=model_3",
    category: "Electric",
  },
  {
    id: 2,
    name: "BMW X5",
    price: 65,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=bmw&model=x5",
    category: "SUV",
  },
  {
    id: 3,
    name: "Mercedes-Benz",
    price: 55,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=mercedes&model=c_class",
    category: "Luxury",
  },
  {
    id: 4,
    name: "Honda Civic",
    price: 35,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=honda&model=civic",
    category: "Sedan",
  },
  {
    id: 5,
    name: "Nissan GT-R",
    price: 90,
    image: "https://cdn.imagin.studio/getImage?customer=c1&make=nissan&model=gt_r",
    category: "Sports",
  },
];

const categories = [
  { name: "SUV", icon: "🚙" },
  { name: "Hybrid", icon: "🚗" },
  { name: "Luxury", icon: "💎" },
  { name: "Electric", icon: "⚡" },

];


const HomeScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-extrabold text-gray-800">RideEazy</Text>
          <View className="bg-white p-2 rounded-full shadow">
            <Ionicons name="person-outline" size={28} color="#111" onPress={() => {router.push("/(auth)/login")}} />
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-6 flex-row items-center bg-white rounded-2xl ">
          <Ionicons name="search" size={22} color="#9CA3AF" />
          <TextInput
            placeholder="Search for cars..."
            placeholderTextColor="#9CA3AF"
            className="ml-3 flex-1 text-base text-gray-600"
            onPress={()=> {}}
          />
        </View>

        {/* Categories */}
        <View className="mt-8">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="fadeInUp"
                delay={index * 150}
                className="flex items-center mr-8"
              >
                <View className="bg-white p-4 rounded-full shadow">
                  <Text className="text-3xl">{item.icon}</Text>
                </View>
                <Text className="mt-2 ml-4 text-sm font-semibold text-gray-600">
                  {item.name}
                </Text>
              </Animatable.View>
            )}
          />
        </View>

        {/* Available Cars Grid */}
        <View className="mt-10">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Available Cars</Text>
          <FlatList
            data={availableCars}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
            renderItem={({ item }) => (
              <View className="bg-white rounded-2xl overflow-hidden w-[170px]">
                {/* Car Image */}
                <View className="relative">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-32 rounded-t-2xl"
                    resizeMode="cover"
                  />
                  
                  
                </View>

                {/* Car Details */}
                <View className="p-3">
                  <Text className="text-xs text-gray-500 mb-1">{item.category}</Text>
                  <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
                  <Text className="text-lg font-bold text-gray-900 mt-1">${item.price}/day</Text>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
