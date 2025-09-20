import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Use presentation instead of animation for better cross-platform support
        presentation: "modal", // or "card" for default behavior
        // Alternative: use animationTypeForReplace for more control
        // animationTypeForReplace: "push",
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: "Login",
          // You can also set animation per screen if needed
          // presentation: "card"
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: "Register", // Fixed: was "Login", should be "Register"
          // presentation: "card"
        }} 
      />
    </Stack>
  );
}