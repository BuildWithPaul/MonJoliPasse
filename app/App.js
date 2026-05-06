import React, { useState } from "react";
import { NativeBaseProvider, extendTheme, Box } from "native-base";
import { SafeAreaView } from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";

import MainContext from "./src/context/MainContext";

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [lastImportedCustomIcon, setLastImportedCustomIcon] = useState(null);
  const [lastQrCodeScanned, setLastQrCodeScanned] = useState(null);
  const [lastCustomisedPassData64, setLastCustomisedPassData64] =
    useState(null);

  const theme = extendTheme({
    config: {
      useSystemColorMode: false,
      initialColorMode: "dark",
    },
    colors: {
      primary: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
      },
      background: {
        600: "#374151",
        700: "#1f2937",
        800: "#101827",
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView bg="background.800" flex={1}>
        {/* share multiple states between components within AppNavigator  */}
        <MainContext.Provider
          value={{
            isScanning,
            setIsScanning,
            lastImportedCustomIcon,
            setLastImportedCustomIcon,
            lastQrCodeScanned,
            setLastQrCodeScanned,
            lastCustomisedPassData64,
            setLastCustomisedPassData64,
          }}
        >
          <AppNavigator />
        </MainContext.Provider>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
