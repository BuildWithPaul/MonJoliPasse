import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { Text, Button, Heading, ScrollView } from "native-base";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Alert, VStack, HStack } from "native-base";

import MainContext from "../../context/MainContext";

const windowWidth = Dimensions.get("window").width;

const SuccessScreen = ({ navigation }) => {
  var svg;
  let {
    lastQrCodeScanned,
    lastImportedCustomIcon,
    lastCustomisedPassData64,
    setLastCustomisedPassData64,
  } = useContext(MainContext);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const _onData64Loaded = async (data64) => {
    data64 = `data:image/png;base64,${data64}`;
    setLastCustomisedPassData64(data64);
    await AsyncStorage.setItem("@last_customised_pass", data64);
  };

  const getData64FromQRC = async () => {
    await sleep(1000);
    if (svg) svg.toDataURL(_onData64Loaded);
  };

  const _onBackToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      _dark={{ bg: "dark.50" }}
      _light={{ bg: "white" }}
      h="100%"
      p={4}
    >
      {/* <Heading color="green.700" size="xl" mb={6}>
        Bravo !
      </Heading> */}
      <QRCode
        size={windowWidth - 32}
        value={lastQrCodeScanned}
        logo={lastImportedCustomIcon}
        logoSize={windowWidth * 0.36}
        logoBackgroundColor="transparent"
        quietZone={20}
        ecl="H"
        getRef={(c) => {
          svg = c;
          getData64FromQRC();
        }}
      />
      <Button size="md" mt={7} mb={7} onPress={_onBackToHome}>
        Revenir à l'accueil
      </Button>
      <Alert
        w="100%"
        maxW="400"
        status="info"
        bg="muted.700"
        colorScheme="info"
      >
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon color="muted.50" />
              <Heading size="sm">Pourquoi ce passe fonctionne ?</Heading>
            </HStack>
          </HStack>
          <Box pl="6">
            Grâce au système de correction d'erreur, les codes QR peuvent
            incorporer des images, sans perdre les informations utiles à la
            lecture du code.
          </Box>
        </VStack>
      </Alert>
    </ScrollView>
  );
};

export default SuccessScreen;
