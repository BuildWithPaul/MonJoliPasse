import React, { useState, useContext, useEffect } from "react";
import { ScrollView, Alert, VStack, HStack } from "native-base";
import { View, Image, Box, Button, Heading, Text, Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo";

import QRCButton from "../components/buttons/imageButton/ImageButton";
import MainContext from "../context/MainContext";
import Modal from "../components/modal/Modal";

import SizedIcon from "../../assets/sized-icon.jpg";
import QRCDark from "../../assets/qrc-dark.jpg";

const Home = ({ navigation }) => {
  const [isQRCModalOpen, setIsQRCModalOpen] = useState(false);
  let {
    lastQrCodeScanned,
    setLastQrCodeScanned,
    lastImportedCustomIcon,
    setLastImportedCustomIcon,
    lastCustomisedPassData64,
    setLastCustomisedPassData64,
  } = useContext(MainContext);

  useEffect(() => {
    getLastUploadedIcon();
  }, []);

  const getLastUploadedIcon = async () => {
    const lastFoundIcon = await AsyncStorage.getItem("@last_uploaded_icon");
    const lastCustomisedPassData64 = await AsyncStorage.getItem(
      "@last_customised_pass"
    );
    setLastImportedCustomIcon(lastFoundIcon);
    setLastCustomisedPassData64(lastCustomisedPassData64);
  };

  useEffect(() => {
    getLastScannedQrCode();
  }, []);

  const getLastScannedQrCode = async () => {
    try {
      let lastScannedQrCode = await AsyncStorage.getItem(
        "@last_scanned_qrcode"
      );
      setLastQrCodeScanned(lastScannedQrCode);
    } catch (e) {
      console.log(e);
    }
  };

  const _onQRCButtonPress = () => {
    setIsQRCModalOpen(true);
  };

  const _onCloseModal = () => {
    setIsQRCModalOpen(false);
  };

  return (
    <ScrollView flex={1} bg="background.800" p={4}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        maxW="100%"
        m={4}
        mt={2}
      >
        <Box maxW="100%" flexShrink={1} mt={6}>
          <Heading size="md" mb={2}>
            Customisez votre passe
          </Heading>
          <Text color="gray.500" w="80%">
            Ajoutez une image à votre passe vaccinal pour l'embellir
          </Text>
        </Box>
        <Image
          source={SizedIcon}
          size={12}
          alt="Alternate Text"
          resizeMode="contain"
          flexGrow={1}
        />
      </HStack>
      <Box mt={4} bg="background.700" borderRadius="sm" p={4}>
        {lastCustomisedPassData64 &&
          lastQrCodeScanned &&
          lastImportedCustomIcon && (
            <>
              <View mt={2}></View>
              {/* <Heading size="sm" mb={3}>
                Votre passe
              </Heading> */}
              <Modal
                size="xl"
                // title="Scannez moi"
                isOpen={isQRCModalOpen}
                onClose={_onCloseModal}
              >
                <Image
                  alt="img"
                  style={{ width: "100%", height: undefined, aspectRatio: 1 }}
                  source={{ uri: lastCustomisedPassData64 }}
                />
              </Modal>
              {/* <Text>{lastCustomisedPassData64}</Text> */}
              <QRCButton
                mb={8}
                source={lastCustomisedPassData64}
                onPress={_onQRCButtonPress}
              />
            </>
          )}

        <Button
          size="lg"
          endIcon={<Icon as={Feather} name="edit" size="md" />}
          onPress={() =>
            navigation.navigate("Customization", {
              screen: "UploadQRC",
            })
          }
          mb={8}
        >
          <Heading size="md"> Customisez votre passe</Heading>
        </Button>

        <Alert w="100%" maxW="400" status="info" bg="background.600" mb={2}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon color="muted.50" />
                <Heading size="sm">Nous respectons votre vie privée</Heading>
              </HStack>
            </HStack>
            <Box pl="6">
              Vos passes vaccinals sont enregistrés uniquement sur votre
              téléphone. Le code source est en accès libre.
            </Box>
          </VStack>
        </Alert>
      </Box>
    </ScrollView>
  );
};

export default Home;
