import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import {
  Button,
  Actionsheet,
  useDisclose,
  Center,
  ScrollView,
  VStack,
  useToast,
  Icon,
  Card,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

import { SafeArea } from "../../utils/SafeArea";
import { useStore } from "../../store/store";
import RenderData from "./RenderData";
import { theme } from "./../../infrastructure/theme/index";
import ActionSheetItem from "./ActionSheetItem";
import MyText from "./../../components/MyText";

const DiabetesCalculate = function ({ navigation }) {
  const {
    commonStore: {
      loading,
      handleCalculate,
      dataResponse,
      clearResponse,
      user,
      getDiabete,
      diabete,
      getUser,
    },
  } = useStore();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclose();
  const [image, setImage] = useState(null);

  // React.useEffect(() => {
  //   return () => {
  //     clearResponse();
  //   };
  // }, []);

  useEffect(() => {
    getDiabete(user?.id);
  }, []);

  console.log("loading", loading);
  console.log("userId", user?.id);
  console.log("diabete", diabete);

  // const setPhoto = async (result) => {
  //   setImage(result.assets[0].uri);
  //   onClose();
  // };

  // const clear = async () => {
  //   setImage(null);
  //   clearResponse();
  //   toast.show({ title: "ลบทั้งหมด", duration: 1000, placement: "top" });
  // };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: false,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) setPhoto(result);
  // };

  // const takePhoto = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("You've refused to allow this app to access your camera!");
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: false,
  //     quality: 1,
  //   });

  //   if (!result.canceled) setPhoto(result);
  // };

  const RenderItem = ({ item }) => {
    const [showMode, setShowMode] = useState(false);

    const setMode = () => setShowMode(!showMode);

    return (
      <View
        style={{
          borderRadius: 15,
          marginBottom: 5,
          backgroundColor: theme.colors.bg.light,
          paddingBottom: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            padding: 15,
          }}
        >
          <Text style={{ fontSize: 20 }}>
            ตรวจเมื่อวันที่ {new Date(item?.createdAt).toLocaleDateString()}
          </Text>
          <Text style={{ fontSize: 20 }}>หมายเหตุ : {item?.note}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              ตาซ้าย
            </Text>

            {item?.imageEyeLeft === null ? (
              <Text>ไม่มีรูปภาพ</Text>
            ) : (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                source={{ uri: item?.imageEyeLeft }}
              />
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
              }}
            >
              ตาขวา
            </Text>
            {item?.imageEyeRight === null ? (
              <Text>ไม่มีรูปภาพ</Text>
            ) : (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                source={{ uri: item?.imageEyeRight }}
              />
            )}
          </View>

          <View>
            <Button bgColor={theme.colors.bg.primary} onPress={setMode}>{showMode ? "กลับ" : "ดูผล"}</Button>
          </View>
        </View>

        {/* //------------------------------------------------------------------------------// */}

        {showMode && (
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                marginTop: 15,
                borderTopWidth: 1,
                borderTopColor: "gray",
              }}
            />
            <View>
              <RenderData
                data={item?.resultLeft}
                noImage={item?.imageEyeLeft}
                title={"ตาซ้าย"}
              />
            </View>

            <View
              style={{
                marginTop: 15,
                borderTopWidth: 1,
                borderTopColor: "gray",
              }}
            />
            <View>
              <RenderData
                data={item?.resultRight}
                noImage={item?.imageEyeRight}
                title={"ตาขวา"}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const data = [
    {
      id: 1,
      note: "",
      createdAt: "2024-02-28T12:08:24.1340121",
      imageEyeLeft:
        "data:image/jpeg;base64,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",
      resultLeft:
        '[{"Key":"2-Moderate","Value":0.6888924},{"Key":"4-Proliferate_DR","Value":0.30055273},{"Key":"3-Severe","Value":0.005701122},{"Key":"1-Mild","Value":0.0048538}]',
      imageEyeRight: null,
      resultRight: "",
    },
    {
      id: 2,
      note: "",
      createdAt: "2024-02-28T12:08:24.1340121",
      imageEyeLeft: null,
      resultLeft: "",
      imageEyeRight:
        "data:image/jpeg;base64,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",
      resultRight: "ไม่เป็นเบาหวาน",
    },
    {
      id: 3,
      note: "",
      createdAt: "2024-02-28T12:08:24.1340121",
      imageEyeLeft:
        "data:image/jpeg;base64,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",
      resultLeft: "ไม่เป็นเบาหวาน",
      imageEyeRight: null,
      resultRight: "",
    },
    {
      id: 4,
      note: "",
      createdAt: "2024-02-28T12:08:24.1340121",
      imageEyeLeft: null,
      resultLeft: "",
      imageEyeRight:
        "data:image/jpeg;base64,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",
      resultRight: "ไม่เป็นเบาหวาน",
    },
  ];

  return (
    <SafeArea>
      {diabete.length ? (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.dashedLine} />

            {diabete.map((item) => (
              <RenderItem item={item} key={item.id} />
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          {loading ? (
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
          )}
        </>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginHorizontal: theme.sizes[1],
    // backgroundColor: theme.colors.bg.light,
  },
  btnCameraContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  btnCamera: {
    width: "40%",
    backgroundColor: theme.colors.bg.primary,
    padding: theme.sizes[2],
    borderRadius: theme.space[3],
    marginVertical: theme.space[2],
  },
  dashedLine: {
    borderColor: theme.colors.bg.lightGray,
    borderStyle: "dashed",
  },
  btnProcess: {
    width: "90%",
    borderRadius: theme.space[4],
    backgroundColor: theme.colors.bg.primary,
    padding: theme.space[2],
    alignItems: "center",
  },
  btnClear: {
    width: "90%",
    borderRadius: theme.space[4],
    backgroundColor: "transparent",
    borderColor: theme.colors.bg.primary,
    padding: theme.space[2],
    borderWidth: theme.space[0],
    alignItems: "center",
    activeOpacity: 0.5,
  },
});

export default observer(DiabetesCalculate);

// {
//   image ? (
//     <Center padding={1} paddingY={2}>
//       <TouchableOpacity onPress={onOpen} activeOpacity={0.7} disabled={loading}>
//         <Image
//           borderRadius={theme.space[2]}
//           style={{ width: 360, height: 400 }}
//           source={{ uri: image }}
//           alt="image"
//         />
//       </TouchableOpacity>
//     </Center>
//   ) : (
//     <View style={styles.btnCameraContainer}>
//       <TouchableOpacity
//         onPress={onOpen}
//         activeOpacity={0.7}
//         style={styles.btnCamera}
//       >
//         <Center>
//           <SimpleLineIcons
//             name="camera"
//             size={theme.fontSizes.h2}
//             color={theme.colors.text.black}
//           />
//         </Center>
//       </TouchableOpacity>
//     </View>
//   );
// }
{
  /* <RenderData data={dataResponse} />

<VStack space={3} marginY={4} alignItems={"center"}>
  <Button
    style={styles.btnProcess}
    leftIcon={<Icon as={AntDesign} name="sync" color="black" />}
    isDisabled={!image}
    isLoading={loading}
    onPress={() => handleCalculate(image)}
  >
    <MyText
      label="ประมวลผล"
      fontSize={theme.sizes[1]}
      color={theme.colors.text.black}
    />
  </Button>

  <Button
    style={styles.btnClear}
    onPress={clear}
    isDisabled={!image}
    leftIcon={
      <Icon
        as={FontAwesome}
        name="remove"
        size="lg"
        color={theme.colors.bg.primary}
      />
    }
  >
    <MyText
      label="ล้างข้อมูล"
      fontSize={theme.sizes[1]}
      color={theme.colors.bg.primary}
    />
  </Button>
</VStack>

<Actionsheet isOpen={isOpen} onClose={onClose}>
  <Actionsheet.Content>
    <ActionSheetItem
      label="อัลบัม"
      icons="photo-library"
      onPress={pickImage}
    />
    <ActionSheetItem
      label="ถ่ายรูป"
      icons="photo-camera"
      onPress={takePhoto}
    />
  </Actionsheet.Content>
</Actionsheet> */
}
