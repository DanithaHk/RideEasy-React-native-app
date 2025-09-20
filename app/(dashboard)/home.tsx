import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Car data
const availableCars = [
  {
    id: 1,
    name: "Alto K10",
    price: 7500,
    image: require("../../assets/images/alto.jpg"),
    category: "Petrol",
  },
  {
    id: 2,
    name: "Bezza",
    price: 8500,
    image: require("../../assets/images/bezza.jpg"),
    category: "Petrol",
  },
  {
    id: 3,
    name: "Seagul",
    price: 1000,
    image: require("../../assets/images/byd.jpg"),
    category: "Electric",
  },
  {
    id: 4,
    name: "Aqua",
    price: 8500,
    image: require("../../assets/images/aqua.jpg"),
    category: "Hybrid",
  },
  {
    id: 5,
    name: "Swift",
    price: 9000,
    image: require("../../assets/images/swift.jpg"),
    category: "Hybrid",
  },
  {
    id: 6,
    name: "Prius",
    price: 10000,
    image: require("../../assets/images/prius.jpg"),
    category: "Hybrid",
  },
];

const categories = [
  { name: "Petrol", icon: "local-gas-station" },
  { name: "Hybrid", icon: "battery-charging-full" },
  { name: "Electric", icon: "electric-car" },
];

const HomeScreen = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Petrol");

  const filteredCars = availableCars.filter(
    (car) => car.category === activeCategory
  );
  const handlePress = ()=>{
    
    router.push("/(auth)/login");
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-extrabold text-gray-800">RideEazy</Text>
          <View className="bg-white p-2 rounded-full shadow">
            <Ionicons
              name="person-outline"
              size={28}
              color="#111"
              onPress={handlePress}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-6 flex-row items-center bg-white rounded-2xl p-2">
          <Ionicons name="search" size={22} color="#9CA3AF" />
          <TextInput
            placeholder="Search for cars..."
            placeholderTextColor="#9CA3AF"
            className="ml-3 flex-1 text-base text-gray-600"
          />
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 8,
            borderBottomWidth: 1,
            marginTop: 10,
            borderColor: "#eee",
          }}
        >
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setActiveCategory(cat.name)}
              style={{
                alignItems: "center",
                borderBottomWidth: activeCategory === cat.name ? 3 : 0,
                borderBottomColor:
                  activeCategory === cat.name ? "#E7C825" : "transparent",
                paddingBottom: 4,
              }}
            >
              <MaterialIcons
                name={cat.icon as any}
                size={28}
                color={activeCategory === cat.name ? "#111" : "#888"}
              />
              <Text
                style={{
                  color: activeCategory === cat.name ? "#111" : "#888",
                  fontWeight: activeCategory === cat.name ? "bold" : "500",
                }}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Available Cars */}
        <View className="mt-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Available Cars
          </Text>
            <FlatList
                data={filteredCars}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                  
                    marginBottom: 15, // Vertical spacing between rows
                }}
                renderItem={({ item }) => (
                    <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 16,
                        overflow: "hidden",
                        width: 160,
                        elevation: 2,
                    }}
                    >
                    <Image
                        source={item.image}
                        style={{
                        width: "100%",
                        height: 130,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        }}
                        resizeMode="stretch"
                    />
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>
                        {item.category}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>
                        {item.name}
                        </Text>
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
