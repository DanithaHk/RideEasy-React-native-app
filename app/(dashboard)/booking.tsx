import { useAuth } from "@/context/AuthContext";
import { getBookings } from "@/services/bookingService";
import { BookingType } from "@/type";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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

const BookingScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async (): Promise<void> => {
    if (!user?.name) return;

    try {
      const userBookings: BookingType[] = await getBookings(user.name);
      console.log(userBookings);
      
      setBookings(userBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const onCarButtonPress = (): void => {
    router.push("/home");
    console.log("Car button pressed");
  };

  // Convert Firestore Timestamp to JS Date safely
  const toDate = (value: Timestamp | Date | undefined): Date | undefined => {
    if (!value) return undefined;
    return value instanceof Timestamp ? value.toDate() : value;
  };

  // Separate active bookings and history
  const activeBookings = bookings.filter(
    (b) => toDate(b.rentalEndDate)! > new Date()
  );
  const historyBookings = bookings.filter(
    (b) => toDate(b.rentalEndDate)! <= new Date()
  );

  const formatDate = (value: Timestamp | Date | undefined): string =>
    toDate(value)?.toDateString() || "";

  const defaultImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAoedKtel78R3DVJxuOYI0uypUygaaKTchRrazx7i5hj8Wb5jRwB6DVPw4KN1yDyfeROK9mBEThbJgiSpnG6pxj0bV0AGmHJ0Kb6MuaooJIgb2yrL_kMPpkcFSZW-qLOOywQNmwsmqglVLm4LDviXKuFCuMxD4km4zH-Wfr27sCkLnyLP7CkOsIgPrVsWHWdJcA_mMylQEpSnT22UZQmOgzPj54JcU8wtwudsDyv4DSpF6pSU9J8c5wmCA-2mGsZd0k9DG35k0";

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
            <Text style={styles.buttonText}>Cars</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.historyButton]}>
            <MaterialIcons name="history" size={20} color="#fff" />
            <Text style={[styles.buttonText, { color: "#fff" }]}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Active Bookings */}
        <Text style={styles.sectionTitle}>Active Bookings</Text>
        {activeBookings.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#6b7280", marginTop: 8 }}>
            No active bookings
          </Text>
        ) : (
          activeBookings.map((item: BookingType) => (
            <View key={item.id} style={styles.bookingCard}>
              <View style={styles.bookingTopRow}>
                <ImageBackground
                  source={{ uri:  defaultImage }}
                  style={styles.bookingImage}
                  imageStyle={{ borderRadius: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.bookingType}>{item.carName}</Text>
                  <Text style={styles.bookingId}>Booking ID: {item.id}</Text>
                </View>
                <View style={styles.starCircle}>
                  <MaterialIcons name="star" size={16} color="#fff" />
                </View>
              </View>
              <View style={styles.bookingBottomRow}>
                <View>
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <Text style={styles.dateValue}>{formatDate(item.rentalStartDate)}</Text>
                </View>
                <View>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <Text style={styles.dateValue}>{formatDate(item.rentalEndDate)}</Text>
                </View>
                <Text style={styles.price}>{item.total}</Text>
              </View>
            </View>
          ))
        )}

        {/* Booking History */}
        <Text style={styles.sectionTitle}>Booking History</Text>
        {historyBookings.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#6b7280", marginTop: 8 }}>
            No past bookings
          </Text>
        ) : (
          historyBookings.map((item: BookingType) => (
            <View key={item.id} style={[styles.bookingCard, { backgroundColor: "#f4f4f5" }]}>
              <View style={styles.bookingTopRow}>
                <ImageBackground
                  source={{ uri:  defaultImage }}
                  style={styles.bookingImage}
                  imageStyle={{ borderRadius: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.bookingType}>{item.carName}</Text>
                  <Text style={styles.bookingId}>Booking ID: {item.id}</Text>
                </View>
              </View>
              <View style={styles.bookingBottomRow}>
                <View>
                  <Text style={styles.dateLabel}>Start Date</Text>
                  <Text style={styles.dateValue}>{formatDate(item.rentalStartDate)}</Text>
                </View>
                <View>
                  <Text style={styles.dateLabel}>End Date</Text>
                  <Text style={styles.dateValue}>{formatDate(item.rentalEndDate)}</Text>
                </View>
                <Text style={styles.price}>{item.total}</Text>
              </View>
            </View>
          ))
        )}
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
  historyButton: { backgroundColor: "#ea2a33", borderWidth: 0 },
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
});
