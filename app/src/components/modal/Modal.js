import React from "react";
import { Text, Modal as NativeModal } from "native-base";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Modal = ({ title, full, children, onClose, ...props }) => {
  return (
    <NativeModal
      {...props}
      onClose={() => {
        onClose();
      }}
    >
      <NativeModal.Content
      // borderRadius={full ? 0 : undefined}
      // size={full ? "full" : undefined}
      // h={full ? windowWidth : "100%"}
      // maxH={full ? windowWidth : undefined}
      >
        {/* {onClose && <NativeModal.CloseButton onPress={onClose} />} */}
        {!!title && <NativeModal.Header>{title}</NativeModal.Header>}
        <NativeModal.Body p={0}>{children}</NativeModal.Body>
        {/* <NativeModal.Footer></NativeModal.Footer> */}
      </NativeModal.Content>
    </NativeModal>
  );
};

Modal.propTypes = {
  ...NativeModal.propTypes,
  title: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  ...NativeModal.defaultProps,
  title: null,
  children: null,
};

export default Modal;
