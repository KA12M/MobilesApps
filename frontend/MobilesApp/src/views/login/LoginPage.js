import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, FormControl, Heading, Input } from "native-base";
import { observer } from "mobx-react-lite";

import { theme } from "./../../infrastructure/theme/index";
import { SafeArea } from "../../utils/SafeArea";
import { useStore } from "./../../store/store";

function LoginPage({ navigation }) {
  const { loading, newByName } = useStore().commonStore;
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [isValid, setIsValid] = React.useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    validateForm();
    if (!isValid) return;

    // ทำบางอย่างเมื่อกด Submit
    newByName(formData).then(() => {
      navigation.replace("home");
    });
  };

  const validateForm = () => {
    // ทำตรวจสอบความถูกต้องของข้อมูลที่นี่
    const isFirstNameValid = formData.firstName.trim() !== "";
    const isLastNameValid = formData.lastName.trim() !== "";
    const isPhoneNumberValid = /^[0-9]{10}$/.test(formData.phone);

    // ตรวจสอบเงื่อนไขความถูกต้องของข้อมูล
    const isValidForm =
      isPhoneNumberValid && isLastNameValid && isFirstNameValid;

    setIsValid(isValidForm);
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Heading size="xl">
          <Text style={{ fontFamily: theme.fonts.primary }}>Login</Text>
        </Heading>

        <FormControl>
          <FormControl.Label>ชื่อ</FormControl.Label>
          <Input
            size="md"
            placeholder="กรอกชื่อ"
            isRequired
            autoFocus
            value={formData.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
            onEndEditing={validateForm}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>นามสกุล</FormControl.Label>
          <Input
            size="md"
            placeholder="กรอกนามสกุล"
            isRequired
            value={formData.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
            onEndEditing={validateForm}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>เบอร์โทรศัพท์</FormControl.Label>
          <Input
            size="md"
            placeholder="กรอกเบอร์โทรศัพท์"
            isRequired
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            onEndEditing={validateForm}
          />
        </FormControl>

        <FormControl mt="4">
          <Button
            onPress={handleSubmit}
            isLoading={loading}
            colorScheme="success"
            isDisabled={!isValid}
          >
            บันทึก
          </Button>
        </FormControl>
      </View>
    </SafeArea>
  );
}

export default observer(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space[2],
    marginHorizontal: 20,
  },
});
