import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BarberInfo() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <View className="px-4 mt-4">

      {/* Button */}
      <TouchableOpacity
  onPress={() => setShowInfo(!showInfo)}
  className="mt-3 bg-primary px-4 py-2 rounded-full self-start flex-row items-center"
>
  <Text className="text-white font-semibold text-sm mr-2">
    About Our Barber
  </Text>

  <Ionicons
    name={showInfo ? "chevron-up-outline" : "chevron-down-outline"}
    size={16}
    color="white"
  />
</TouchableOpacity>

      {/* Expandable Content */}
      {showInfo && (
  <View className="mt-3 bg-gray-100 p-4 rounded-xl">
    <Text className="text-secondary text-sm mb-2">
      ✂️ Professional & Certified Barber
    </Text>

    <Text className="text-secondary text-sm mb-2">
      🧼 100% Hygiene & Safety Maintained
    </Text>

    <Text className="text-secondary text-sm">
      💈 5+ Years Experience in Modern Styles
    </Text>
  </View>
)}
    </View>
  );
}

