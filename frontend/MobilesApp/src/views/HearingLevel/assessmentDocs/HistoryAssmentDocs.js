import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { SafeArea } from "../../../utils/SafeArea";
import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import RenderItemDoc from "./components/RenderItemDoc";
// import { writeFile, readFile, DownloadDirectoryPath } from "react-native-fs";
// import { XLSX } from "xlsx";

const HistoryAssmentDocs = () => {
  const {
    hearingStore: { FMHTByUser, getFMHTByUserId },
    commonStore: { user },
  } = useStore();

  useEffect(() => {
    getFMHTByUserId(user.id);
  }, []);

  console.log("FMHTByUser", FMHTByUser);

  // const exportDataToExcel = () => {
  //   let sample_data_to_excel = [
  //     {
  //       id: "1",
  //       name: "ajoo tec",
  //       secert: "12345678",
  //       algorithm: "13333333",
  //       digits: "6",
  //       period: "30",
  //     },
  //     {
  //       id: "1",
  //       name: "ajoo tec",
  //       secert: "12345678",
  //       algorithm: "13333333",
  //       digits: "6",
  //       period: "30",
  //     },
  //     {
  //       id: "1",
  //       name: "ajoo tec",
  //       secert: "12345678",
  //       algorithm: "13333333",
  //       digits: "6",
  //       period: "30",
  //     },
  //   ];

  //   let wb = XLSX.utils.book_new();
  //   let ws = XLSX.utils.json_to_sheet(sample_data_to_excel);
  //   XLSX.utils.book_append_sheet(wb, ws, "Users");
  //   const wbout = XLSX.write(wb, { type: "binary", bookype: "xlsx" });

  //   writeFile(DownloadDirectoryPath + "/ajootec.csv", wbout, "ascii")
  //     .then((res) => {
  //       alert("Export Data SuccessFully...");
  //     })
  //     .catch((e) => {
  //       console.log("Error writeFile", e);
  //     });
  // };

  // const handleClick = async () => {
  //   try {
  //     let isPermitedExternalStorage = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.write_EXTERNAL_STORAGE
  //     );

  //     if (!isPermitedExternalStorage) {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.write_EXTERNAL_STORAGE,
  //         {
  //           title: "Storage permission needed",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         exportDataToExcel();
  //         console.log("Permission granted");
  //       } else {
  //         console.log("Permission denied");
  //       }
  //     } else {
  //       exportDataToExcel();
  //     }
  //   } catch (e) {
  //     console.log("Error while checking permission");
  //     console.log(e);
  //   }
  // };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        {/* <Button title="download excel" onPress={handleClick} /> */}
        <View>
          {FMHTByUser.map((item, i) => (
            <RenderItemDoc key={i} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default observer(HistoryAssmentDocs);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8 },
});
