import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Card({ item, full }) {

  const { color, currency, balance, accountNumber, validThru } = item;
  const balanceAmount = (val) => {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: full ? "#fff" : color },
        { width: full ? "100%" : 250 },
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.flagContainer,
            { backgroundColor: full ? "#F6F6F6" : "#fff" },
          ]}
        >
          <Image
            source={{
              uri: "https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg",
            }}
            style={styles.flag}
          />
          <Text style={styles.currency}>{currency}</Text>
        </View>
        <Image
          source={require("../../assets/images/visa.png")}
          style={styles.cardType}
        />
      </View>
      <Text style={[styles.balanceLabel, { color: full ? "#BFC8D3" : "#fff" }]}>
        Your balance
      </Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>${balanceAmount(balance)}</Text>
        <TouchableOpacity
          style={[styles.eye, { backgroundColor: full ? "#FFF" : color }]}
        >
          <AntDesign name="eyeo" size={24} color={full ? "#BFC8D3" : "white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={[styles.label, { color: full ? "#BFC8D3" : "#fff" }]}>
            Account number
          </Text>
          <Text style={styles.accountNumber}>{accountNumber}</Text>
        </View>
        <View>
          <Text style={[styles.label, { color: full ? "#BFC8D3" : "#fff" }]}>
            Valid thru
          </Text>
          <Text style={styles.validThru}>{validThru}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    // width: full ? "100%" : 250,
    height: 220,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  flagContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 25,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 50,
  },
  currency: {
    fontSize: 10,
    fontFamily: "SFProBold",
    color: "#000",
  },
  cardType: {
    width: 40,
    height: 40,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: "SFProRegular",
    color: "#fff",
    marginTop: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: "SFProRegular",
    color: "#fff",
    marginTop: 15,
  },
  balanceContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  balance: {
    fontSize: 28,
    fontFamily: "SFProMedium",
    color: "#000",
  },
  eye: {
    width: 35,
    height: 35,
    backgroundColor: "#ABE7FC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: "SFProMedium",
    color: "#000",
  },
  validThru: {
    fontSize: 14,
    fontFamily: "SFProMedium",
    color: "#000",
  },
});
