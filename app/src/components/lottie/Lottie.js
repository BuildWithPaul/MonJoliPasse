import React, { useCallback, useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const Lottie = ({ ...props }) => {
  const [lottieRef, setLottieRef] = useState(null);
  const [rerender, setRerender] = useState(false);

  const test = useCallback(() => {
    if (lottieRef) {
      lottieRef.play();
    }
  }, [lottieRef]);

  useEffect(() => {
    if (rerender) {
      test();
    }
  }, [test, rerender]);

  useEffect(() => {
    setTimeout(() => {
      setRerender(true);
    }, 200);
  }, []);

  return <LottieView ref={(ref) => setLottieRef(ref)} {...props} />;
};

Lottie.propTypes = {
  ...LottieView.propTypes,
};

Lottie.defaultProps = {
  ...LottieView.defaultProps,
};

export default Lottie;
