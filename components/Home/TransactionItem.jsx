import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const TransactionItem = ({ item }) => {
  const { type, to, from, amount, currency, time } = item;
  const isPositive = amount > 0;

  return (
    <View style={styles.transactionContainer}>
      <View style={styles.iconContainer}>
        <Feather
          name={type === "Transfer" ? "arrow-up-right" : "arrow-down-left"}
          size={24}
          color="black"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.transactionText}>
          {type} {type === "Transfer" ? `to ${to}` : `from ${from}`}
        </Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <Text
        style={[
          styles.amountText,
          // isPositive ? styles.positive : styles.negative,
        ]}
      >
        <Text style={[isPositive ? styles.positive : styles.negative]}>
          {isPositive ? `+` : `-`}
        </Text>
        ${Math.abs(amount).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    // borderWidth: 1,
    borderColor: "#000",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 2,
    display: "flex",
    justifyContent: "center",
  },
  transactionText: {
    fontSize: 16,
    fontFamily: "SFProMedium",
    color: "#000",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "SFProMedium",
    color: "#A4B0C1",
  },
  amountText: {
    fontSize: 16,
    fontFamily: "SFProMedium",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
});

export default TransactionItem;
