import React from "react";
import { Text } from "react-native";
import { Actionsheet, HStack, Spacer } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "../../infrastructure/theme";

export default function ActionSheetItem({label, icons, onPress}) {
  return (
    <Actionsheet.Item onPress={onPress}>
      <HStack space={[2, 3]} justifyContent="space-between">
        <MaterialIcons
          name={icons}
          size={28}
          color={theme.colors.text.lightDarK}
        />
        <Text
          style={{
            fontSize: theme.fontSizes.title,
            fontFamily: theme.fonts.primary,
            color: theme.colors.text.lightDarK,
          }}
        >
          {label}
        </Text>
        <Spacer />
      </HStack>
    </Actionsheet.Item>
  );
}
