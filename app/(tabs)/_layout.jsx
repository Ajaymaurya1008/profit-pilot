import { Stack, Tabs } from "expo-router";
import home from "./home";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import homeIcon from "../../assets/images/home.png";
import homeDark from "../../assets/images/home-dark.png";
import scannerIcon from "../../assets/images/scanner.png";
import scannerDark from "../../assets/images/scanner-dark.png";
import creditCard from "../../assets/images/credit-card.png";
import creditCardDark from "../../assets/images/credit-card-dark.png";

export default function tabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginBottom: 30,
          width: "45%",
          alignSelf: "center",
          backgroundColor: "#fff",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          shadowOpacity: 0.0,
          shadowRadius: 0.0,
          shadowColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={focused ? homeDark : homeIcon}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={focused ? scannerDark : scannerIcon}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stat"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={focused ? creditCardDark : creditCard}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
