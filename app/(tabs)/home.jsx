import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from "react-native";
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { transactionData, cardData } from "../../constants/Data";
import TransactionItem from "../../components/Home/TransactionItem";
import Card from "../../components/Home/Card";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function Home() {
  // State management for transaction, persisted data, and errors
  const [transaction, setTransaction] = useState({
    amount: "",
    person: "",
    account: "",
  });
  const [persistedData, setPersistedData] = useState([]);
  const [errors, setErrors] = useState({});

  // Refs for bottom sheet modal and its open state
  const bottomSheetModalRef = useRef(null);
  const isBottomSheetOpen = useRef(false);

  // Handle changes in transaction input fields
  const handleChange = useCallback((name, value) => {
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Validate transaction input fields
  const validate = () => {
    const newErrors = {};
    if (!transaction.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(transaction.amount) || Number(transaction.amount) <= 0) {
      newErrors.amount = "Amount must be a number greater than zero";
    }
    if (!transaction.person) newErrors.person = "Person name is required";
    if (!transaction.account) {
      newErrors.account = "Account number is required";
    } else if (isNaN(transaction.account) || Number(transaction.account) <= 0) {
      newErrors.account = "Account number must be numeric";
    }
    return newErrors;
  };

  // Format time for transaction display
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + strMinutes + " " + ampm;
  };

  // Handle sending money (creating a new transaction)
  // Get Existing transactions from SecureStore and add new transaction
  const handleSendMoney = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const transactionItem = {
      ...transaction,
      amount: -Number(transaction.amount),
      time: formatTime(new Date()),
      id: Math.floor(Math.random() * 1000000),
      currency: "USD",
      type: "Transfer",
      to: transaction.person,
    };
    let transactions = await SecureStore.getItemAsync("transactions");
    transactions = transactions && JSON.parse(transactions);
    const newTransactions = [transactionItem, ...transactions];
    await SecureStore.setItemAsync(
      "transactions",
      JSON.stringify(newTransactions)
    );
    setPersistedData(newTransactions);
    bottomSheetModalRef.current?.dismiss();
  };

  // Present the bottom sheet modal when the button is pressed
  const handlePresentModalPress = useCallback(() => {
    isBottomSheetOpen.current = true;
    bottomSheetModalRef.current?.present();
  }, []);

  // Array of snap points for the bottom sheet modal to snap to different positions
  const snapPoints = useMemo(() => ["39%", "65%"], []);

  // Load persisted transactions on component mount and set state
  // If there are no persisted transactions, set the state to the default transaction data
  useEffect(() => {
    const getTransactions = async () => {
      let transactions = await SecureStore.getItemAsync("transactions");
      transactions = JSON.parse(transactions);
      if (transactions === null || transactions.length === 0) {
        await SecureStore.setItemAsync(
          "transactions",
          JSON.stringify(transactionData)
        );
        setPersistedData(transactionData);
      } else {
        setPersistedData(transactions);
      }
    };
    getTransactions();
  }, []);


  // Listen for keyboard events and snap the bottom sheet modal to the correct position
  useEffect(() => {
    let keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      if (isBottomSheetOpen.current) {
        bottomSheetModalRef.current?.snapToIndex(0);
      }
    });

    let keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      if (isBottomSheetOpen.current) {
        bottomSheetModalRef.current?.snapToIndex(1);
      }
    });

    // Clean up listeners on component unmount
    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.c1}>
          <View style={styles.profile}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dfh7pmyj0/image/upload/v1722924120/user_jy1r7e.png",
              }}
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
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true}
          />
        </View>
        <View style={styles.c3}>
          <TouchableOpacity style={styles.button}>
            <Feather name="arrow-down-left" size={24} color="black" />
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePresentModalPress}
            style={styles.button}
          >
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
            <TouchableOpacity onPress={() => router.push("transactions")}>
              <Text style={styles.c4HeaderText2}>View all</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.c4HeaderToday}>TODAY</Text>
          <FlatList
            data={persistedData}
            renderItem={({ item }) => <TransactionItem item={item} />}
            horizontal={false}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onDismiss={() => {
            isBottomSheetOpen.current = false;
          }}
        >
          <BottomSheetView style={styles.bottomSheet}>
            <TextInput
              placeholder="Enter person name"
              style={[styles.input, errors.person && styles.inputError]}
              onChangeText={(text) => handleChange("person", text)}
            />
            <TextInput
              placeholder="Enter Account number"
              style={[styles.input, errors.account && styles.inputError]}
              onChangeText={(text) => handleChange("account", text)}
            />
            <TextInput
              placeholder="Enter amount"
              style={[styles.input, errors.amount && styles.inputError]}
              onChangeText={(text) => handleChange("amount", text)}
            />
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={handleSendMoney}
            >
              <Text style={styles.buttonModalText}>Send Money</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
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
    // height: "100%",
    flex: 1,
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
  bottomSheet: {
    flex: 1,
    backgroundColor: Colors.homeBackground,
  },
  input: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: Colors.grey,
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonModal: {
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonModalText: {
    fontSize: 16,
    fontFamily: "SFProMedium",
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginHorizontal: 20,
    marginTop: -8,
    marginBottom: 8,
  },
  inputError: {
    borderColor: "red",
  },
});
