import React from "react";

import { IconButton } from "native-base";

export default function IconButtons({ children, onPress, style }) {
  return (
    <IconButton
      style={style}
      onPress={onPress}
      icon={children}
      borderRadius="full"
      _icon={{
        color: "coolGray.50",
        size: "md",
      }}
      _hover={{
        bg: "coolGray.800:alpha.20",
      }}
      _ios={{
        _icon: {
          size: "2xl",
        },
      }}
    />
  );
}
