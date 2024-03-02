import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { Button, FormControl, Heading, Input } from "native-base";
import { observer } from "mobx-react-lite";
import DatePicker from "@dietime/react-native-date-picker";
import moment from "moment";
import "moment/locale/th";

import { theme } from "./../../infrastructure/theme/index";
import { SafeArea } from "../../utils/SafeArea";
import { useStore } from "./../../store/store";
import MyToast from "./../../components/MyToast";

function LoginPage({ navigation }) {
  const { loading, register, loginByPhone } = useStore().commonStore;

  const today = moment(new Date()).add(543, "year").format();
  const [date, setDate] = useState(today);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthday: date,
  });

  moment.locale("th");

  const [isValid, setIsValid] = React.useState(false);

  const [loginMode, setLoginMode] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    validateForm();
    if (!isValid) return;

    if (loginMode) {
      console.log("login");
      loginByPhone(formData.phone, navigation, MyToast);
    } else {
      // ทำบางอย่างเมื่อกด Submit
      console.log("register");
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthday: date,
      };

      register(data, navigation, MyToast);
    }
  };

  const validateForm = () => {
    // ทำตรวจสอบความถูกต้องของข้อมูลที่นี่
    const isFirstNameValid = formData.firstName.trim() !== "";
    const isLastNameValid = formData.lastName.trim() !== "";
    const isPhoneNumberValid = /^[0-9]{10}$/.test(formData.phone);

    const test = isLastNameValid && isFirstNameValid;

    // ตรวจสอบเงื่อนไขความถูกต้องของข้อมูล
    const isValidForm = loginMode
      ? isPhoneNumberValid || test
      : isPhoneNumberValid && test;

    setIsValid(isValidForm);
  };

  const setModeLogin = () => setLoginMode(!loginMode);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Heading size="xl" marginTop={7}>
            <Text style={{ fontFamily: theme.fonts.primary }}>
              {loginMode ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </Text>
          </Heading>

          {!loginMode && (
            <>
              <View>
                <FormControl.Label>เลือกวันเกิด</FormControl.Label>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 23 }}>วัน</Text>
                  <Text style={{ fontSize: 23 }}>เดือน</Text>
                  <Text style={{ fontSize: 23 }}>ปี</Text>
                </View>

                <DatePicker
                  value={date}
                  onChange={(value) =>
                    setDate(moment(value).add(543, "year").format())
                  }
                  format="dd-mm-yyyy"
                  locale="th-TH" // ตั้งค่า locale เป็น 'th-TH' เพื่อให้ DatePicker เป็นภาษาไทย
                />

                <FormControl.Label>
                  {date ? moment(date).format("LL") : "เลือกวันที่..."}
                </FormControl.Label>
              </View>

              <FormControl>
                <FormControl.Label>ชื่อ</FormControl.Label>
                <Input
                  size="md"
                  placeholder="กรอกชื่อ"
                  isRequired
                  autoFocus
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange("firstName", text)}
                  // onEndEditing={validateForm}
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
                  // onEndEditing={validateForm}
                />
              </FormControl>
            </>
          )}

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

          <FormControl mt="4">
            <Text
              style={{
                paddingHorizontal: 10,
                width: "50%",
                borderRadius: 50,
              }}
              onPress={setModeLogin}
            >
              {loginMode ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </Text>
          </FormControl>
        </View>
      </ScrollView>
    </SafeAreaView>
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
