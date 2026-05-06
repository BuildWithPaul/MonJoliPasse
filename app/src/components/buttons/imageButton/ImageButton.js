import React from "react";
import PropTypes from "prop-types";
import { Box, AspectRatio, Image, Pressable, Button } from "native-base";

const ImageButton = ({ source, onPress, ...props }) => {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Box
          maxW="100%"
          rounded="lg"
          overflow="hidden"
          _dark={{
            backgroundColor: isPressed ? "dark.200" : "dark.100",
          }}
          _light={{
            backgroundColor: isPressed ? "coolGray.100" : "gray.50",
          }}
          rounded="8"
          shadow={9}
          style={{
            transform: [
              {
                scale: isPressed ? 0.96 : 1,
              },
            ],
          }}
          {...props}
        >
          <Box>
            {/* <Text>{source}</Text> */}
            <AspectRatio w="100%" ratio={2.2 / 1}>
              <Image
                source={{ uri: source }}
                alt="image"
                blurRadius={13}
                resizeMode="cover"
                size="100%"
              />
            </AspectRatio>
          </Box>
          <Button
            backgroundColor="background.600"
            rounded="lg"
            roundedTopLeft={0}
            roundedTopRight={0}
            onPress={onPress}
          >
            Afficher mon passe
          </Button>
        </Box>
      )}
    </Pressable>
  );
};

ImageButton.propTypes = {
  /** The url/base64/node of the image */
  // source: PropTypes.oneOfType([
  //   PropTypes.shape({ uri: PropTypes.string }),
  //   PropTypes.node,
  // ]),
  /** Called when pressing the button */
  onPress: PropTypes.func,
  ...Box.propTypes,
};

export default ImageButton;
