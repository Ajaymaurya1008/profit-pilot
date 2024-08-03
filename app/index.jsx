import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.Container}>
        <View>
          <Text style={styles.text}>Profit Pilot</Text>
        </View>
        <View></View>
        <View></View>
      </View>
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  Container:{
    flex: 1,
    backgroundColor: Colors.onBoardingBackground
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
