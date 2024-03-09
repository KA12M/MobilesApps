import React, { useEffect, useState } from "react";
import { Button, Heading } from "native-base";
import { View, StyleSheet, Image, Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeArea } from "../utils/SafeArea";
import { theme } from "../infrastructure/theme/index";
import MyButton from "./MyButton";
import { useStore } from "./../store/store";
import MyText from "../components/MyText";
import { PaperProvider } from "react-native-paper";
import MyDialog from "../components/MyDialog";

export default function Home({ navigation }) {
  const { user, initialUser } = useStore().commonStore;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initialUser().then((res) => {
      if (res == false && !user) navigation.replace("login");
    });
  }, []);

  const setDialog = () => setVisible(!visible);

  const hanleLogout = async () => {
    setDialog();
    await AsyncStorage.clear();
    navigation.navigate("login");
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Image
          source={require("../../assets/kru.png")}
          style={{ width: 120, height: 155 }}
        />

        <Heading m="6">
          <MyText
            label="มหาวิทยาลัยราชภัฏกาญจนบุรี"
            fontSize={theme.sizes[2]}
            color={theme.colors.text.black}
          />
        </Heading>

        <MyButton
          label="ประเมินระดับโรคเบาหวานด้วยม่านตา"
          iconName="eye"
          onPress={() => navigation.navigate("diabetes")}
        />
        <MyButton
          label="ประเมินการได้ยินเเสียงของหู"
          iconName="hearing"
          iconTemp="MaterialIcons"
          onPress={() => navigation.navigate("hearing-level")}
        />

        <Button
          style={{
            borderRadius: 50,
            backgroundColor: "red",
          }}
          onPress={setDialog}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            ออกจากระบบ
          </Text>
        </Button>

        <MyDialog
          title="ออกจากระบบ"
          content="ออกจากระบบ"
          open={visible}
          setDialog={setDialog}
          onPress={hanleLogout}
        />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg.primary,
    gap: theme.space[2],
  },
});
