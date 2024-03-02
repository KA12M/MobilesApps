import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Center, VStack, HStack, Progress, Button } from "native-base";
import { theme } from "../../infrastructure/theme";

const RenderData = function ({ data, noImage, title }) {
  if (!data) return null;

  const revert = (title === "ตาซ้าย" && "row") || "row-reverse";

  return (
    <Center paddingTop={4}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View>
          {title === "ตาซ้าย" && (
            <Button
              bgColor={theme.colors.bg.primary}
              style={{ fontSize: 25 }}
              disabled
            >
              {title}
            </Button>
          )}
        </View>
        <View>
          {title === "ตาขวา" && (
            <Button
              bgColor={theme.colors.bg.primary}
              style={{ fontSize: 25 }}
              disabled
            >
              {title}
            </Button>
          )}
        </View>
      </View>
      <Center w="100%" maxW="400" marginTop={4}>
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
                    //   < GText>{(val * 100).toFixed(2)}%</>
                    // </HStack>
                    <View key={i}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: title === "ตาซ้าย" ? "" : "flex-end",
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{item.Key}</Text>
                      </View>
                      <HStack space={3}>
                        <View
                          style={{
                            width: "100%",
                          }}
                        >
                          {/* <Text>{i + 1}.</Text> */}

                          <View
                            style={{
                              flexDirection: revert,
                            }}
                          >
                            <Progress
                              width="75%"
                              colorScheme="red"
                              value={item.Value * 100}
                              height={5}
                              style={{
                                flexDirection: revert,
                              }}
                            />
                            <Text
                              style={{
                                top: -7,
                                marginLeft: 10,
                                fontSize: 16,
                                marginRight: 10,
                              }}
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
