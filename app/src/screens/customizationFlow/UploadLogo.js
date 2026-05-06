import React from "react";
import { Dimensions, Platform } from "react-native";
import { Heading, Text, ScrollView } from "native-base";

import Lottie from "../../components/lottie/Lottie";
import CustomisationScreen from "../../components/CustomisationScreen";

const windowWidth = Dimensions.get("window").width;

const UploadLogo = ({ navigation }) => {
  const _onImportImageSuccess = () => {
    navigation.push("SuccessScreen");
  };

  return (
    <>
      <ScrollView
        _dark={{ bg: "dark.50" }}
        _light={{ bg: "white" }}
        h="100%"
        p={4}
      >
        <Heading size="md" mb={6} mb={Platform.OS === "web" ? 8 : 0}>
          Choisissez une image dans votre galerie pour embellir votre passe.
        </Heading>
        {Platform.OS !== "web" && (
          <Lottie
            key="image"
            autoPlay
            loop
            style={{
              width: windowWidth,
              height: windowWidth,
            }}
            source={require("../../lottie/image.json")}
          />
        )}
        <CustomisationScreen onSuccess={_onImportImageSuccess} />
      </ScrollView>
    </>
  );
};

export default UploadLogo;
