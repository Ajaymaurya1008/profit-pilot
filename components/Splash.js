import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash() {


  return (
    <View style={styles.container}>
        <LottieView
          autoPlay
          style={{
            width: 300,
            height: 300,
            backgroundColor: "#fff",
          }}
          source={require("../assets/images/card.json")}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: "cover",
//   },
});
