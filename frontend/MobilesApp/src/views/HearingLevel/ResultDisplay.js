import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { Button } from "native-base";

import { useStore } from "../../store/store";
import { SafeArea } from "../../utils/SafeArea";
import { theme } from "../../infrastructure/theme";
import { volume } from "../../mocks/hearingSoundList";

const RenderItem = ({ item }) => (
  <View>
    <Text>{item.ear == 0 ? "left" : "right"}</Text>

    {volume.map((volumeName, i) => (
      <Text key={i}>
        {volumeName}: {item[volumeName] < 120 ? item[volumeName] : "no result"}
      </Text>
    ))}
  </View>
);

const ResultDisplay = () => {
  const { result, processResult, clearResult, newHearing } =
    useStore().hearingStore;
  const { user } = useStore().commonStore;

  useEffect(() => {
    processResult();

    return () => (result ? clearResult : undefined);
  }, []);

  if (!result) return;

  return (
    <SafeArea>
      <View style={styles.container}>
        <FlatList
          data={result.items}
          keyExtractor={(el) => el.ear}
          renderItem={RenderItem}
          ListFooterComponent={
            <Button onPress={() => newHearing(user.id)}>บันทึก</Button>
          }
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginHorizontal: theme.sizes[1],
    backgroundColor: theme.colors.bg.light,
  },
});

export default observer(ResultDisplay);
