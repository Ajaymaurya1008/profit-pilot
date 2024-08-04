import { Stack } from "expo-router";
import Splash from "../components/Splash";
import { useState, useEffect, useRef, useMemo } from "react";
import { useFonts } from "expo-font";
import { BottomSheet, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Text, StyleSheet } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";


export default function RootLayout() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  const snapPoints = useMemo(() => ["50%"], []);
  const [fontsLoaded] = useFonts({
    SFProRegular: require("../assets/fonts/SFPRODISPLAYREGULAR.ttf"),
    SFProMedium: require("../assets/fonts/SFPRODISPLAYMEDIUM.ttf"),
    SFProBold: require("../assets/fonts/SFPRODISPLAYBOLD.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 2000);
  });

  return (
    <>
      <GestureHandlerRootView>
        <PortalProvider>
          <BottomSheetModalProvider>
            {isShowSplashScreen ? (
              <Splash />
            ) : (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>
            )}
          </BottomSheetModalProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    zIndex: 1000,
  },
  bottomSheet: {
    position: "absolute",
    zIndex: 100,
  },
});
