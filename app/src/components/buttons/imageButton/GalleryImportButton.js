import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { useToast, Button, Icon } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import MainContext from "../../../context/MainContext";

const ImageImport = ({ navigation }) => {
  const { setLastQrCodeScanned } = useContext(MainContext);
  setLastQrCodeScanned;
  const [image, setImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, Camera roll permissions are required to make this work!"
          );
        }
      }
    })();
  }, []);

  const storeData = async (value) => {
    try {
      setLastQrCodeScanned(value);
      await AsyncStorage.setItem("@last_scanned_qrcode", value);
    } catch (e) {
      // saving error
    }
  };

  const chooseImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // aspect: [4, 3],
      quality: 1,
      allowsEditing: false,
    });

    var res = await BarCodeScanner.scanFromURLAsync(result.uri, [
      BarCodeScanner.Constants.BarCodeType.qr,
    ]);
    // QrCode Found
    if (res.length > 0) {
      console.log(res[0].data);
      storeData(res[0].data);
      navigation.push("UploadLogo");
    } else {
      console.log("QrCode not found");
      toast.show({
        placement: "top",

        title: "Aïe aïe aïe",
        status: "error",
        description:
          "Malheuresement aucun passe vaccinal n'a pu être trouvé dans cette image",
      });
    }
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Button
      leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="md" />}
      size="md"
      onPress={chooseImg}
    >
      Chercher dans ma galerie
    </Button>
  );
};

export default ImageImport;
