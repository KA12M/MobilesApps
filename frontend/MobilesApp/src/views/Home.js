import React from "react";
import { Button, Heading } from "native-base";
import { View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeArea } from "../utils/SafeArea";
import { theme } from "../infrastructure/theme/index";
import MyButton from "./MyButton";
import { useStore } from "./../store/store";
import MyText from "../components/MyText";

export default function Home({ navigation }) {
  const { user, initialUser } = useStore().commonStore;

  React.useEffect(() => {
    initialUser().then((res) => {
      if (res == false && !user) navigation.replace("login");
    });
  }, []);

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
          onPress={async () => {
            await AsyncStorage.clear();
          }}
        >
          Test เคลียร์ข้อมูล
        </Button>
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
