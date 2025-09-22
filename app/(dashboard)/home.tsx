import { useAuth } from "@/context/AuthContext";
import { saveBooking } from "@/services/bookingService";
import { BookingType } from "@/type";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  Modal,
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
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [loading, setLoading] = useState(false);

// Calculate rental days dynamically
const rentalDays = Math.max(
  1,
  Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
);
  
  const { user , setUser } = useAuth(); 
  const filteredCars = availableCars.filter(
    (car) => car.category === activeCategory
  );
  const handlePress = ()=>{ 
    router.push("/login");
  }
  const saveBook = () => {
    if(!selectedCar){
      return;
    }
    setLoading(true);
    if(!user){
      alert("Please login to book a car");
      setLoading(false);
      return;
    }
   const booking: BookingType = {
  carName: selectedCar.name,
  carCategory: selectedCar.category,
  rentalStartDate: startDate,
  rentalEndDate: endDate,
  rentalDays: rentalDays,
  dailyRate: selectedCar.price,
  total: selectedCar.price * rentalDays,
  userName: user.name ?? undefined, // convert null to undefined
};

    try{
      const response =  saveBooking(booking);
      alert("Booking successful");
      setSelectedCar(null);
      setLoading(false);
      return response;
    }catch(error:any){
      alert("Booking failed: " + error.message);
      setLoading(false);
      return { success: false, message: error.message || "Failed to save booking" };
  }
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
            contentContainerStyle={{ paddingBottom: 20 }}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedCar(item)}
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
                  style={{ width: "100%", height: 130, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
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
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={!!selectedCar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCar(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: Dimensions.get("window").height * 0.85,
              backgroundColor: "#fff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            {selectedCar && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {/* Car Image */}
                <Image
                  source={selectedCar.image}
                  style={{
                    width: "100%",
                    height: 200,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                  }}
                  resizeMode="cover"
                />

                {/* Car Details */}
                <View className="p-4">
                  <Text className="text-2xl font-bold">{selectedCar.name}</Text>
                  <Text className="mt-1 text-gray-500">
                    {selectedCar.category} · 4 seats · Automatic
                  </Text>
                </View>

                <View className="px-4 mt-2 bg-white rounded-2xl py-3 shadow-md">
                  <Text className="text-lg font-bold mb-3">Rental Summary</Text>

                  {/* Date Pickers */}
                  <View className="flex-row justify-between mb-3">
                    <TouchableOpacity
                      onPress={() => setShowStartPicker(true)}
                      className="flex-1 mr-2 bg-gray-200 p-2.5 rounded-xl items-center"
                    >
                      <Text className="text-black font-medium">
                        Start: {startDate.toDateString()}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setShowEndPicker(true)}
                      className="flex-1 ml-2 bg-gray-200 p-2.5 rounded-xl items-center"
                    >
                      <Text className="text-black font-medium">
                        End: {endDate.toDateString()}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {showStartPicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={(event, date) => {
                        setShowStartPicker(false);
                        if (date) setStartDate(date);
                      }}
                    />
                  )}

                  {showEndPicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      minimumDate={startDate}
                      onChange={(event, date) => {
                        setShowEndPicker(false);
                        if (date) setEndDate(date);
                      }}
                    />
                  )}

                  {/* About booking */}
                  <View className="border-t border-gray-200 pt-3">
                    <View className="flex-row justify-between py-1.5">
                      <Text className="text-gray-500">Rental Days</Text>
                      <Text className="font-medium">{rentalDays} days</Text>
                    </View>
                    <View className="flex-row justify-between py-1.5">
                      <Text className="text-gray-500">Daily Rate</Text>
                      <Text className="font-medium">${selectedCar.price}</Text>
                    </View>
                    <View className="flex-row justify-between py-1.5">
                      <Text className="font-bold text-lg">Total</Text>
                      <Text className="font-bold text-lg">${selectedCar.price * rentalDays}</Text>
                    </View>
                  </View>
                </View>

                {/* Book Now Button */}
                <View className="p-4 mt-4">
                  <TouchableOpacity className="bg-red-600 py-3.5 rounded-full items-center" onPress={saveBook}>
                    <Text className="text-white text-lg font-bold">Book Now</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};

export default HomeScreen;


