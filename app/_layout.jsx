import { Stack } from "expo-router";
import Splash from "../components/Splash";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";

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
      {isShowSplashScreen ? (
        <Splash />
      ) : (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      )}
    </>
  );
}
