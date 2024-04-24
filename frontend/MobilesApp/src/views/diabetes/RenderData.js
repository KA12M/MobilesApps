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

  console.log("data", data);

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
            <Button bgColor="rose.600" style={{ fontSize: 25 }} disabled>
              <Text style={{ fontSize: 20, color: "white" }}>{title}</Text>
            </Button>
          )}
        </View>

        <View>
          {title === "ตาขวา" && (
            <Button bgColor="blue.500" color="black" disabled>
              <Text style={{ fontSize: 20 }}>{title}</Text>
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
                        <Text style={{ fontSize: 16 }}>
                          {item.Key === "No_DR"
                            ? "โอกาสไม่เป็นเบาหวาน"
                            : item.Key === "DR"
                            ? "โอกาสเป็นเบาหวาน"
                            : item.Key}
                        </Text>
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
                              // colorScheme={
                              //   title === "ตาซ้าย" ? "green" : "yellow"
                              // }
                              _filledTrack={{
                                bg:
                                  item.Key === "No_DR"
                                    ? "green.500"
                                    : "rose.500",
                              }}
                              value={item.Value}
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
                              {item.Value.toFixed(3)} %
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
