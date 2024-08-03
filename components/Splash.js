import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash() {
//   const fadeAnimation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnimation, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnimation]);


  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[styles.imageContainer, { opacity: fadeAnimation }]}
      > */}
        <LottieView
          autoPlay
        //   ref={animation}
          style={{
            width: 300,
            height: 300,
            backgroundColor: "#fff",
          }}
          source={require("../assets/images/card.json")}
        />
      {/* </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
