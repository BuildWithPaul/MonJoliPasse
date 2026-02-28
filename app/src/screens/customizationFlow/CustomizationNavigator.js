import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, useTheme } from "native-base";
import { Feather } from "@expo/vector-icons";

import UploadQRC from "./UploadQRC";
import UploadLogo from "./UploadLogo";
import SuccessScreen from "./SuccessScreen";
import ScannerScreen from "../../components/ScannerScreen";

const MainStack = createNativeStackNavigator();

const BackButton = ({ navigation }) => {
  return (
    <IconButton
      variant="ghost"
      _icon={{
        as: Feather,
        name: "arrow-left",
      }}
      onPress={() => navigation.goBack()}
      _pressed={{
        backgroundColor: "transparent",
      }}
      m={-4}
    />
  );
};

const CustomisationNavigator = ({ navigation }) => {
  const theme = useTheme();

  const options = {
    headerLeft: () => <BackButton navigation={navigation} />,
    headerStyle: {
      backgroundColor: theme.colors.background[800],
      headerTintColor: "#fff",
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
  };

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="UploadQRC"
        component={UploadQRC}
        options={{
          title: "Étape 1/2",
          ...options,
        }}
      />
      <MainStack.Screen
        name="UploadLogo"
        component={UploadLogo}
        options={{
          title: "Étape 2/2",
          ...options,
        }}
      />
      <MainStack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          title: "Scannez votre passe",
          ...options,
        }}
      />
      <MainStack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{
          title: "Voici votre nouveau passe !",
          ...options,
        }}
      />
    </MainStack.Navigator>
  );
};

export default CustomisationNavigator;
