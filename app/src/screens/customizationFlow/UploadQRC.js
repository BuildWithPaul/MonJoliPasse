import React, { useContext } from "react";
import { Dimensions, Platform } from "react-native";
import { Button, Heading, Icon, Text, ScrollView } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import MainContext from "../../context/MainContext";

import GalleryImportButton from "../../components/buttons/imageButton/GalleryImportButton";
import Lottie from "../../components/lottie/Lottie";
import ScannerScreen from "../../components/ScannerScreen";

const windowWidth = Dimensions.get("window").width;

const UploadQRC = ({ navigation }) => {
  let { isScanning, setIsScanning } = useContext(MainContext);

  const _onScanQRCSuccess = () => {
    console.log("UploadLogo");
    navigation.push("UploadLogo");
  };

  const _onCameraPress = () => {
    setIsScanning(true);
    console.log("ScannerScreen");
    navigation.push("ScannerScreen");
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@last_scanned_qrcode", value);
    } catch (e) {
      // saving error
    }
  };

  return (
    <>
      <ScrollView
        _dark={{ bg: "dark.50" }}
        _light={{ bg: "white" }}
        h="100%"
        p={4}
      >
        <Heading size="md" mb={6}>
          Scannez votre passe en utilisant votre camera ou importez-le depuis
          votre galerie photo.
        </Heading>
        {Platform.OS !== "web" && (
          <Lottie
            key="qr-code-scanner"
            autoPlay
            loop
            style={{
              width: windowWidth,
              height: windowWidth,
            }}
            source={require("../../lottie/qr-code-scanner.json")}
          />
        )}
        <Button
          leftIcon={<Icon as={Ionicons} name="scan" size="md" />}
          size="md"
          onPress={_onCameraPress}
          mb={6}
        >
          Scanner avec ma camera
        </Button>
        <GalleryImportButton navigation={navigation} />
      </ScrollView>
    </>
  );
};

export default UploadQRC;
