import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";

export default function index() {
  // State to control whether to show splash screen or not
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(null);

  useEffect(() => {
    // Check if the app has been set up before
    const checkIsSet = async () => {
      const value = await SecureStore.getItemAsync("isSet");
      setIsShowSplashScreen(value ? false : true);
    };
    checkIsSet();
  }, []);

  // Show nothing while checking the setup status
  if (isShowSplashScreen === null) {
    return null;
  }

  // Function to navigate to home and set the app as initialized
  const navigateHome = async () => {
    await SecureStore.setItemAsync("isSet", "true");
    router.push("home");
  };

  return (
    <>
      {isShowSplashScreen ? (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.Container}>
            <View style={styles.c1}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dfh7pmyj0/image/upload/v1722924118/onBoarding_fbxfoc.png",
                }}
                style={styles.onBoardingImage}
              />
            </View>
            <View style={styles.c2}>
              <Text style={styles.title}>
                Your {"\n"} <Text style={styles.titleBold}>Financial</Text>{" "}
                {"\n"} Navigator
              </Text>
              <Text style={styles.desc}>
                Invest in projects that make a difference. Join us in supporting
                the impactful initiatives and create a positive change in the
                world.
              </Text>
            </View>
            <View style={styles.c3}>
              <TouchableOpacity onPress={navigateHome} style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <Redirect href="/home" />
      )}
    </>
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
    // backgroundColor: Colors.onBoardingBackground,
  },
  c1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "100%",
    borderColor: "#000",
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
  },
  desc: {
    fontSize: 15,
    color: "#5c5b57",
    fontFamily: "SFProRegular",
  },
  button: {
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
