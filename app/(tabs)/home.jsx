import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { transactionData, cardData } from "../../constants/Data";
import TransactionItem from "../../components/Home/TransactionItem";
import Card from "../../components/Home/Card";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.c1}>
          <View style={styles.profile}>
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.logo}
            />
            <Text style={styles.profileText}>
              Welcome back, {"\n"}
              <Text style={styles.username}>Sarah Muller</Text>
            </Text>
          </View>
          <Feather style={styles.bell} name="bell" size={24} color="black" />
        </View>
        <View style={styles.c2}>
          <Text style={styles.account}>Account</Text>
          <FlatList
            data={cardData}
            renderItem={({ item }) => <Card item={item} full={false} />}
            horizontal={true}
          />
        </View>
        <View style={styles.c3}>
          <TouchableOpacity style={styles.button}>
            <Feather name="arrow-down-left" size={24} color="black" />
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Feather name="arrow-up-right" size={24} color="black" />
            <Text style={styles.buttonText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Ionicons name="add-sharp" size={24} color="white" />
          </TouchableOpacity>
          <View></View>
        </View>
        <View style={styles.c4}>
          <View style={styles.c4Header}>
            <Text style={styles.c4HeaderText}>Transaction</Text>
            <Text style={styles.c4HeaderText2}>View all</Text>
          </View>
          <Text style={styles.c4HeaderToday}>TODAY</Text>
          <FlatList
            data={transactionData}
            renderItem={({ item }) => <TransactionItem item={item} />}
            horizontal={false}
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.homeBackground,
    paddingTop: 15,
  },
  c1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
  },
  c2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 10,
    gap: 10,
  },
  c3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 5,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    gap: 10,
    borderColor: "#000",
    // borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "SFProMedium",
    color: Colors.black,
  },
  button2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  button2Text: {
    fontSize: 20,
    fontFamily: "SFProMedium",
    color: "#fff",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 10,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 14,
    fontFamily: "SFProRegular",
    color: "#737373",
  },
  username: {
    fontSize: 18,
    fontFamily: "SFProMedium",
    color: "#000",
  },
  bell: {
    marginRight: 20,
  },
  account: {
    fontSize: 26,
    fontFamily: "SFProMedium",
    color: Colors.black,
    textAlign: "left",
    marginBottom: 10,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    width: 250,
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
    marginTop: 10,
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
  c4: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    height: 300,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    height: "100%",
  },
  c4Header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    // borderWidth: 1,
  },
  c4HeaderText: {
    fontSize: 28,
    fontFamily: "SFProMedium",
    color: "#000",
  },
  c4HeaderText2: {
    fontSize: 14,
    fontFamily: "SFProMedium",
    color: "#A4B0C1",
  },
  c4HeaderToday: {
    fontSize: 14,
    fontFamily: "SFProMedium",
    color: "#C1CAD5",
  },
});
