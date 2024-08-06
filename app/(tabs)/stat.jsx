import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import Card from "../../components/Home/Card";
import { cardData, months } from "../../constants/Data";
import { LineChart } from "react-native-chart-kit";
import { Dropdown } from "react-native-element-dropdown";

export default function Statistic() {
  const [month, setMonth] = useState(1);
  const [value, setValue] = useState(0);

  const data = [
    { label: "Earnings", value: "0" },
    { label: "Expenses", value: "1" },
    { label: "Savings", value: "2" },
  ];

  const renderDotContent = ({ x, y, index, indexData }) => {
    return (
      <View
        key={index}
        style={{
          position: "absolute",
          top: y - 24,
          left: x - 20,
          width: 40,
          alignItems: "center",
        }}
      >
        <Text style={styles.renderDotContentText}>${indexData.toFixed(2)}</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text style={styles.renderItemText}>{item.label}</Text>
      </View>
    );
  };

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
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartHeaderText}>Transactions</Text>
            <View style={styles.dropDownContainer}>
              <Dropdown
                style={styles.dropDown}
                placeholderStyle={styles.dropDownPlaceholder}
                selectedTextStyle={styles.dropDownSelectedText}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Earnings"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 60}
            withHorizontalLabels={false}
            height={190}
            renderDotContent={renderDotContent}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(135,220,251, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(160, 162, 162, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
              propsForLabels: {
                fontSize: 12,
                fontWeight: 500,
              },
              fillShadowGradient: "rgba(135, 220, 251,1)",
              fillShadowGradientOpacity: 0.6,
            }}
            bezier
            style={styles.chartKit}
          />
        </View>
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
    paddingHorizontal: 20,
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
    // paddingHorizontal: 15,
  },
  c2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    // marginHorizontal: 15,
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
    borderColor: "#000",
  },
  monthText: {
    fontSize: 12,
    fontFamily: "SFProMedium",
    color: "#CCD4DD",
  },
  renderDotContent: {
    position: "absolute",
    width: 40,
    alignItems: "center",
  },
  renderDotContentText: {
    color: Colors.black,
    fontSize: 10,
    fontFamily: "SFProMedium",
  },
  renderItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  renderItemText: {
    fontSize: 10,
    fontFamily: "SFProMedium",
    color: Colors.black,
  },
  chartContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderColor: "#000",
    marginTop: 20,
    marginHorizontal: 15,
  },
  chartHeader: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chartHeaderText: {
    fontSize: 20,
    fontFamily: "SFProMedium",
    color: Colors.black,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 10,
  },
  dropDownContainer: {
    backgroundColor: "#F6F6F6",
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 10,
    borderColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dropDown: {
    height: 30,
    width: 65,
    fontSize: 8,
    fontFamily: "SFProMedium",
    borderRadius: 15,
    borderColor: "#000",
    alignItems: "center",
  },
  dropDownPlaceholder: {
    fontSize: 10,
    fontFamily: "SFProMedium",
    color: Colors.black,
  },
  dropDownSelectedText: {
    fontSize: 10,
    fontFamily: "SFProMedium",
    color: Colors.black,
  },
  chartKit: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 0,
    borderColor: "#000",
    paddingRight: 1,
    paddingLeft: 20,
  },
});
