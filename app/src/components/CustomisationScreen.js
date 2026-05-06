import React, { useEffect, useContext } from "react";
import { Button, Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainContext from "../context/MainContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function CustomisationScreen({ onSuccess }) {
  const { setLastImportedCustomIcon } = useContext(MainContext);

  useEffect(() => {
    getLastUploadedIcon();
  }, []);

  const getLastUploadedIcon = async () => {
    const lastFoundIcon = await AsyncStorage.getItem("@last_uploaded_icon");
    setLastImportedCustomIcon(lastFoundIcon);
  };

  const chooseImg = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // aspect: [1, 1],
      quality: 1,
      allowsEditing: false,
    });
    setLastImportedCustomIcon(result.uri);
    await AsyncStorage.setItem("@last_uploaded_icon", result.uri);
    onSuccess?.();
  };

  return (
    <Button
      leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="md" />}
      onPress={chooseImg}
    >
      Importer une image
    </Button>
  );
}
