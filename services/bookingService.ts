import { db } from "@/firebase";
import { BookingType } from "@/type";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Alert } from "react-native";

export const saveBooking = async (booking: BookingType) =>  {
    try
    {
    const bookingData = {
      ...booking,
      rentalStartDay: Timestamp.fromDate(booking.rentalStartDate),
      rentalEndDay: Timestamp.fromDate(booking.rentalEndDate),
      createdAt: Timestamp.now(),
    };
    await addDoc(collection(db, "bookings"), bookingData);
    Alert.alert("Success", "Booking saved successfully");
    return { success: true };
    }
    catch(error:any)
    {
        Alert.alert("Error", error.message || "Failed to save booking");
        return { success: false, message: error.message || "Failed to save booking" };
    }
}