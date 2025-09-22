import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const bookingsData = [
  {
    type: "Compact",
    id: "#12345",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkHhfrUCZdSidGTXCfUNCo6vJPYtlJk6ychvu3E8PiDCHyiYykZd-R8qjF6SFlveK5xu-r0YrvHLjv1LDz4LdCZtmvOAxotey92ZFNrTBEQXPSpS-WYO4pU-cQCfSpdK6mOT9FORO0qF5cb99TZsfE3deB_KjgO-AUPptcWiFnHFT9f3mQINbWsSRN5nZ8UWVBCg-MuO8hy6x-ocA8D2Ynk5BXG0YCps7AdmHmVOWxGK5CVs7UcVPVypXjWyaF3UgdzqRYdurCRZ_",
    start: "June 1, 2024",
    end: "June 5, 2024",
    price: "$50/day",
  },
];

const historyData = [
  {
    type: "Sedan",
    id: "#67890",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZBwgA2JlAx-LrdCxEStxZS1YIb56gIytx13gHj504lW6k8rs7nawUXLYWQOwCW3HhsgK640L88xIyCWEeqq_zz6NnZVu9ySRrq01Ct8GJ8C6kFcjqXvzCKa_yLWgEAr6sAmjEKQ-zDzLxpbKCysRHhyjH3ybVyWboBAxTFTLdXenBc72Q_vmX_7jDgKTU7PRO2gDwAMKkT-W4XztG5z92WkcTqIr1-wR18A4e46JY6uGG7hFmmwHij2P3xRU1RNZgBgtwgixWOa8",
    start: "May 15, 2024",
    end: "May 20, 2024",
    price: "$70/day",
  },
  {
    type: "SUV",
    id: "#11223",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoedKtel78R3DVJxuOYI0uypUygaaKTchRrazx7i5hj8Wb5jRwB6DVPw4KN1yDyfeROK9mBEThbJgiSpnG6pxj0bV0AGmHJ0Kb6MuaooJIgb2yrL_kMPpkcFSZW-qLOOywQNmwsmqglVLm4LDviXKuFCuMxD4km4zH-Wfr27sCkLnyLP7CkOsIgPrVsWHWdJcA_mMylQEpSnT22UZQmOgzPj54JcU8wtwudsDyv4DSpF6pSU9J8c5wmCA-2mGsZd0k9DG35k3etvn0",
    start: "July 10, 2024",
    end: "July 12, 2024",
    price: "$90/day",
  },
];
const onCarButtonPress = () => {
  router.push("/home");
  console.log("Car button pressed");
}
const BookingScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Bookings</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={onCarButtonPress}>
            <MaterialIcons name="directions-car" size={20} color="#111" />
            <Text style={styles.buttonText} >Cars</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.historyButton]}>
            <MaterialIcons name="history" size={20} color="#fff" />
            <Text style={[styles.buttonText, { color: "#fff" }]}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Active Bookings */}
        <Text style={styles.sectionTitle}>Active Bookings</Text>
        {bookingsData.map((item, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={styles.bookingTopRow}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.bookingImage}
                imageStyle={{ borderRadius: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.bookingType}>{item.type}</Text>
                <Text style={styles.bookingId}>Booking ID: {item.id}</Text>
              </View>
              <View style={styles.starCircle}>
                <MaterialIcons name="star" size={16} color="#fff" />
              </View>
            </View>
            <View style={styles.bookingBottomRow}>
              <View>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>{item.start}</Text>
              </View>
              <View>
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>{item.end}</Text>
              </View>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}

        {/* Booking History */}
        <Text style={styles.sectionTitle}>Booking History</Text>
        {historyData.map((item, index) => (
          <View key={index} style={[styles.bookingCard, { backgroundColor: "#f4f4f5" }]}>
            <View style={styles.bookingTopRow}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.bookingImage}
                imageStyle={{ borderRadius: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.bookingType}>{item.type}</Text>
                <Text style={styles.bookingId}>Booking ID: {item.id}</Text>
              </View>
            </View>
            <View style={styles.bookingBottomRow}>
              <View>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>{item.start}</Text>
              </View>
              <View>
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>{item.end}</Text>
              </View>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}

        
      </ScrollView>

      
      
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, paddingBottom: 8, backgroundColor: "#fff" },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#111" },
  buttonRow: { flexDirection: "row", gap: 8, padding: 16 },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  historyButton: {
    backgroundColor: "#ea2a33",
    borderWidth: 0,
  },
  buttonText: { fontSize: 14, fontWeight: "500", color: "#111" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#111", paddingHorizontal: 16, marginTop: 16 },
  bookingCard: {
    backgroundColor: "#fef3c7",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fde68a",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  bookingTopRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  bookingImage: { width: 96, height: 64 },
  bookingType: { fontSize: 16, fontWeight: "bold", color: "#111" },
  bookingId: { fontSize: 12, color: "#6b7280" },
  starCircle: { backgroundColor: "#facc15", borderRadius: 50, padding: 6 },
  bookingBottomRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" },
  dateLabel: { fontSize: 10, color: "#6b7280" },
  dateValue: { fontSize: 14, fontWeight: "600", color: "#111" },
  price: { fontSize: 14, fontWeight: "bold", color: "#111" },
  bookNowButton: { backgroundColor: "#ea2a33", borderRadius: 50, paddingVertical: 16, alignItems: "center" },
  bookNowText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItem: { flex: 1, alignItems: "center" },
  navText: { fontSize: 10, fontWeight: "500", color: "#6b7280", marginTop: 2 },
});
