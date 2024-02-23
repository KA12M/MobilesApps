import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
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
    commonStore: { loading, handleCalculate, dataResponse, clearResponse },
  } = useStore();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclose();
  const [image, setImage] = useState(null);

  React.useEffect(() => {
    return () => {
      clearResponse();
    };
  }, []);

  const setPhoto = async (result) => {
    setImage(result.assets[0].uri);
    onClose();
  };

  const clear = async () => {
    setImage(null);
    clearResponse();
    toast.show({ title: "ลบทั้งหมด", duration: 1000, placement: "top" });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setPhoto(result);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) setPhoto(result);
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        {image ? (
          <Center padding={1} paddingY={2}>
            <TouchableOpacity
              onPress={onOpen}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Image
                borderRadius={theme.space[2]}
                style={{ width: 360, height: 400 }}
                source={{ uri: image }}
                alt="image"
              />
            </TouchableOpacity>
          </Center>
        ) : (
          <View style={styles.btnCameraContainer}>
            <TouchableOpacity
              onPress={onOpen}
              activeOpacity={0.7}
              style={styles.btnCamera}
            >
              <Center>
                <SimpleLineIcons
                  name="camera"
                  size={theme.fontSizes.h2}
                  color={theme.colors.text.black}
                />
              </Center>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.dashedLine} />

        <RenderData data={dataResponse} />

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
        </Actionsheet>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginHorizontal: theme.sizes[1],
    backgroundColor: theme.colors.bg.light,
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
