import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";

const MyLoading = ({ loading }) => {
  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
        }}
      >
        ไม่มีข้อมูล
      </Text>
    </View>
  );
};

export default observer(MyLoading);
