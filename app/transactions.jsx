import { View, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import TransactionItem from "../components/Home/TransactionItem";
import { useNavigation } from "expo-router";

export default function Transactions() {
  const [transactionData, setTransactionData] = useState([]);
  const navigations = useNavigation();

  useEffect(() => {
    const getTransactions = async () => {
      let transactions = await SecureStore.getItemAsync("transactions");
      setTransactionData(JSON.parse(transactions));
    };
    getTransactions();
    navigations.setOptions({
      headerShown: true,
      headerTitle: "All Transactions",
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={transactionData}
          renderItem={({ item }) => <TransactionItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderColor: "#000",
    marginTop: -35,
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});
