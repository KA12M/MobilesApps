import React from "react";
import { Text } from "react-native";

import { theme } from "../infrastructure/theme";

export default function MyText({
  label,
  fontSize = theme.fontSizes.h5,
  fontFamily = theme.fonts.primary,
  color = theme.colors.text.lightDarK,
}) {
  return (
    <Text
      style={{
        fontSize,
        fontFamily,
        color,
      }}
    >
      {label}
    </Text>
  );
}
