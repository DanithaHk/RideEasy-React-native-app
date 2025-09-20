import { auth, db } from "@/firebase";
import { AuthContextType, UserType } from "@/type";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Listen to Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // fetch extra user data from Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists() ? docSnap.data() : {};

        const userData: UserType = {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName ?? data?.name ?? null,
          licenceNumber: data?.licenceNumber ?? null,
          expiryDate: data?.expiryDate ?? null,
          licenceImage: data?.licenceImage ?? null,
        };

        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data from Firestore
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.exists() ? docSnap.data() : {};

      const userData: UserType = {
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName ?? data?.name ?? null,
        licenceNumber: data?.licenceNumber ?? null,
        expiryDate: data?.expiryDate ?? null,
        licenceImage: data?.licenceImage ?? null,
      };

      setUser(userData);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, msg: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Save basic info to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email,
        name,
        licenceNumber: null,
        expiryDate: null,
        licenceImage: null,
      });

      setUser({
        uid: res.user.uid,
        email,
        name,
        licenceNumber: null,
        expiryDate: null,
        licenceImage: null,
      });

      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, msg: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user data (fetch from Firestore)
  const updateUserData = async (uid: string) => {
    try {
      setLoading(true);

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data?.email ?? null,
          name: data?.name ?? null,
          licenceNumber: data?.licenceNumber ?? null,
          expiryDate: data?.expiryDate ?? null,
          licenceImage: data?.licenceImage ?? null,
        };
        setUser(userData);
      }
    } catch (error: any) {
      console.error("Error updating user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
