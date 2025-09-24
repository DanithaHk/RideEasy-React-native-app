# 🚗 RideEase - Car Rental Mobile App

RideEase is a modern **car rental mobile application** built with **React Native**.  
It allows users to **browse cars, book rentals, manage profiles**, and **upload driving licenses** with a clean, intuitive UI.  
The app features **smooth animations**, **Material Icons**, and **Firebase integration** for authentication and data management.

---

## 🌟 Features

- 📱 **Beautiful UI** with smooth animations  
- 🔑 **User Authentication** (Firebase Auth)  
- 📄 **Driving License Upload** with Cloudinary integration  
- 🚘 **Car Browsing & Booking**  
- 🎨 **Material Icons** for a modern look  
- 🌐 **Real-time Data Sync** with Firestore  
- ⚡ **Responsive design** for all mobile devices  

---

## 🎥 Demo

Watch the full demo on **YouTube**:  
[![RideEase Demo](https://img.youtube.com/vi/ZhiF-HsnPAY/0.jpg)](https://youtu.be/ZhiF-HsnPAY?si=goz-NCc-cwPN_smw)

---

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development  
- **Expo** - Simplified app development and deployment  
- **Firebase** - Authentication & Firestore database  
- **Cloudinary** - Image storage and hosting  
- **React Navigation** - App navigation  
- **Material Icons** - Modern UI icons

---

## ⚙️ Installation & Setup

Follow these steps to set up RideEase locally:

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/your-username/rideease.git
cd rideease
# Install core dependencies
npx create-expo-app@latest
npm install

# React Navigation
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

# Firebase
npm install firebase

# Expo Image Picker (for driving license upload)
npx expo install expo-image-picker

# Material Icons
npx expo install @expo/vector-icons

# Cloudinary upload (using fetch + FormData, no library needed)
# If you prefer Axios for API calls
npm install axios

# Gesture Handler & Animations
npx expo install react-native-gesture-handler react-native-reanimated

# Dotenv for environment variables
npm install react-native-dotenv
