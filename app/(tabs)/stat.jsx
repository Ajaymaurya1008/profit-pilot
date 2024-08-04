import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import Card from "../../components/Home/Card";
import { cardData, months } from "../../constants/Data";
import { useState } from "react";

export default function Statistic() {
  const [month, setMonth] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Statistic</Text>
        <View style={styles.c1}>
          <Card item={cardData[0]} full={true} />
        </View>
        <View style={styles.c2}>
          <FlatList
            data={months}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.monthContainer,
                  {
                    backgroundColor:
                      month === item.id ? Colors.primary : "#fff",
                  },
                ]}
                onPress={() => setMonth(item.id)}
              >
                <Text
                  style={[
                    styles.monthText,
                    { color: month === item.id ? "#000" : "#A6B3C2" },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    paddingTop: 25,
  },
  title: {
    fontSize: 18,
    fontFamily: "SFProMedium",
    color: Colors.black,
    textAlign: "left",
    marginBottom: 20,
  },
  c1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    paddingHorizontal: 15,
  },
  c2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 3,
    overflow: "hidden",
  },
  monthContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
    // borderWidth: 1,
    borderColor: "#000",
  },
  monthText: {
    fontSize: 12,
    fontFamily: "SFProMedium",
    color: "#CCD4DD",
  },
});
