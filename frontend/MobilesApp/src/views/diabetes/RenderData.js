import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Center, VStack, HStack, Progress } from "native-base";

const RenderData = function ({ data, noImage, title }) {
  if (!data) return null;

  console.log("data", data);

  return (
    <Center paddingY={4}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Center w="100%" maxW="400" marginTop={8}>
        <VStack space="md">
          {noImage ? (
            <>
              {data === "ไม่เป็นเบาหวาน" ? (
                <Text style={{ fontSize: 16 }}>{data}</Text>
              ) : data === "ไม่มีรูภาพ" ? (
                <Text style={{ fontSize: 16 }}>{data}</Text>
              ) : (
                <>
                  {JSON.parse(data).map((item, i) => (
                    // <HStack space={3} key={i}>
                    //   <Text>{i + 1}.</Text>
                    //   <Progress width={160} colorScheme="primary" value={val * 100} />
                    //   <Text>{(val * 100).toFixed(2)}%</Text>
                    // </HStack>
                    <View key={i}>
                      <View>
                        <Text style={{ fontSize: 16 }}>{item.Key}</Text>
                      </View>
                      <HStack space={3}>
                        <View
                          style={{
                            width: "100%",
                          }}
                        >
                          {/* <Text>{i + 1}.</Text> */}

                          <View style={{ flexDirection: "row" }}>
                            <Progress
                              width="60%"
                              colorScheme="primary"
                              value={item.Value * 100}
                              height={4}
                            />
                            <Text
                              style={{ top: -7, marginLeft: 10, fontSize: 16 }}
                            >
                              {(item.Value * 100).toFixed(3)} %
                            </Text>
                          </View>
                        </View>
                      </HStack>
                    </View>
                  ))}
                </>
              )}
            </>
          ) : (
            <Text style={{ fontSize: 16 }}>ไม่มีรูภาพ</Text>
          )}
        </VStack>
      </Center>
    </Center>
  );
};

export default RenderData;
