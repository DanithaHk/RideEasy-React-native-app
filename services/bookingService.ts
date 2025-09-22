import { db } from "@/firebase";
import { BookingType } from "@/type";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { Alert } from "react-native";

// Helper to ensure we get a Date object
const toDate = (value: Date | Timestamp | undefined): Date => {
  if (!value) return new Date();
  return value instanceof Timestamp ? value.toDate() : value;
};

export const saveBooking = async (booking: BookingType) => {
  try {
    const bookingData = {
      ...booking,
      rentalStartDay: Timestamp.fromDate(toDate(booking.rentalStartDate)),
      rentalEndDay: Timestamp.fromDate(toDate(booking.rentalEndDate)),
      createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, "bookings"), bookingData);
    Alert.alert("Success", "Booking saved successfully");
    return { success: true };
  } catch (error: any) {
    Alert.alert("Error", error.message || "Failed to save booking");
    return { success: false, message: error.message || "Failed to save booking" };
  }
};

export const getBookings = async (userName: string) => {
  try {
    console.log(userName);
    
    const bookingsRef = collection(db, "bookings"); // Reference to bookings collection
    const q = query(bookingsRef, where("userName", "==", userName)); // Filter by userId
    const querySnapshot = await getDocs(q); // Execute query

    // Convert Firestore documents to plain objects including id
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log(userName);
    console.log("Fetched bookings:", bookings);
    
    return bookings as BookingType[]; // Array of bookings for this user
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};
