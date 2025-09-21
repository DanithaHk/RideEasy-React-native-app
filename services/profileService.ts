import { auth, db } from "@/firebase";
import { ProfileDataType } from "@/type";
import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserProfileData = async (data: ProfileDataType) => {
  const { name, licenceNumber, expiryDate } = data;

  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user");

  try {
    // update Auth displayName
    await firebaseUpdateProfile(user, { displayName: name });

    // update Firestore document
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { name, licenceNumber, expiryDate });

    // return updated data
    return { uid: user.uid, email: user.email, name, licenceNumber, expiryDate  };
  } catch (error: any) {
    throw new Error(error.message || "Failed to update profile");
  }
};
