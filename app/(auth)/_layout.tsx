// FILE: app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const AuthLayout = () => {
  useEffect(() => {
    console.log("AuthLayout mounted");
  }, []);

  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          title: "Login" 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          headerShown: false,
          title: "Register" 
        }} 
      />
    </Stack>
  );
};

export default AuthLayout;