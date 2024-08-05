import { Stack } from "expo-router";
import Splash from "../components/Splash";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

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
        <BottomSheetModalProvider>
          {isShowSplashScreen ? (
            <Splash />
          ) : (
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="transactions" />
            </Stack>
          )}
        </BottomSheetModalProvider>
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
