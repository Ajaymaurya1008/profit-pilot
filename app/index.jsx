import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.Container}>
        <View style={styles.c1}>
          <Image
            source={require("../assets/images/onBoarding.png")}
            style={styles.onBoardingImage}
          />
        </View>
        <View style={styles.c2}>
          <Text style={styles.title}>
            Your {"\n"} <Text style={styles.titleBold}>Financial</Text> {"\n"}{" "}
            Navigator
          </Text>
          <Text style={styles.desc}>
            Invest in projects that make a difference. Join us in supporting the impactful initiatives and create a positive change in the world.
          </Text>
        </View>
        <View style={styles.c3}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
  },
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  c1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "100%",
    borderColor: "#000",
    // borderWidth: 5,
    zIndex: 0,
  },
  c2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderColor: "#000",
    gap: 15,
    // borderWidth: 5,
    zIndex: 1,
    marginTop: -80,
  },
  c3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  onBoardingImage: {
    width: "100%",
    height: "100%",
    // borderColor: "#000",
    // borderWidth: 5,
    resizeMode: "contain",
  },
  title: {
    fontSize: 60,
    color: Colors.text,
    width: "100%",
    fontFamily: "SFProMedium",
    lineHeight: 70,
  },
  titleBold: {
    fontSize: 60,
    color: Colors.text,
    width: "100%",
    fontFamily: "SFProBold",
    // fontWeight: "bold",
  },
  desc: {
    fontSize: 15,
    color: "#5c5b57",
    fontFamily: "SFProRegular",
  },
  button:{
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "SFProMedium",
  },
});
