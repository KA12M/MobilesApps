import { View, Text } from "react-native";
import { useStore } from "../../../../store/store";

export const RenderEachData = ({ data, color }) => {
  const { reCheckEachValue } = useStore().hearingStore;

  return (
    <View>
      {Object.entries(data).map(([key, value]) => {
        if (key.startsWith("v")) {
          const prefix = key.replace("v", "") + "Hz";

          return (
            <View
              key={key}
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: 70,
                }}
              >
                <Text style={{ color: color }}>{prefix}</Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ marginLeft: 40, color: color }}>{value}</Text>
                  <Text style={{ marginLeft: 20, color: color }}>
                    {reCheckEachValue(value)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};
