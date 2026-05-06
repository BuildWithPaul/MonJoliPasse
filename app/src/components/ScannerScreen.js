import React, { useContext, useState, useEffect } from "react";
import { Vibration, Image, Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { Box } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainContext from "../context/MainContext";

const hud = require("../../assets/scanner-hud.png");

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

const ScannerScreen = ({ navigation, onSuccess }) => {
  const { isScanning, setIsScanning, setLastQrCodeScanned } =
    useContext(MainContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (isScanning)
      try {
        setIsScanning(false);
        console.log(data);
        setLastQrCodeScanned(data);
        await AsyncStorage.setItem("@last_scanned_qrcode", data);
        onSuccess?.(data);
        Vibration.vibrate();
        navigation.push("UploadLogo");
      } catch (e) {
        console.error(e);
      }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Box
      _dark={{ bg: "background" }}
      _light={{ bg: "white" }}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <Image style={styles.qr} source={hud} />
      </BarCodeScanner>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  qr: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "10%",
    textAlign: "center",
    width: "70%",
    color: "white",
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
  },
});

export default ScannerScreen;
