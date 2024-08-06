import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useRef, useCallback, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Colors } from "../../constants/Colors";

export default function App() {
  // State for camera permission, scan status, and scanned data
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [link, setLink] = useState(null);

  // Ref for the bottom sheet modal
  const bottomSheetModalRef = useRef(null);

  // Array of snap points for the bottom sheet modal to snap to different positions
  const snapPoints = useMemo(() => ["39%"], []);

  // Request camera permission and set state based on the result
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Extract links from the scanned data and set the link state
  const extractLink = (data) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = data.match(urlRegex);
    if (urls) {
      setLink(urls[0]);
      return data.replace(urls[0], "").trim();
    }
    return data;
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Function to handle bar code scanned event, set the scanned state, extract links, and present the bottom sheet modal
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    handlePresentModalPress();
    extractLink(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      >
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onDismiss={() => {
            setLink(null), setScanned(false);
          }}
        >
          <BottomSheetView style={styles.bottomSheet}>
            <Text>Scanned Data : {scannedData}</Text>
            {link && (
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => Linking.openURL(link)}
              >
                <Text style={styles.buttonModalText}>Open Link</Text>
              </TouchableOpacity>
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: Colors.homeBackground,
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  buttonModal: {
    height: 50,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonModalText: {
    fontSize: 16,
    fontFamily: "SFProMedium",
    color: "#fff",
  },
});
