// components/ScreenWrapper.tsx
import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from "react-native";

interface ScreenWrapperProps {
  children: ReactNode;       // children type fix
  style?: ViewStyle;         // optional custom style
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default ScreenWrapper;
