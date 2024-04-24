import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { useStore } from "../../../store/store";
import { Button, Progress } from "native-base";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import { lottieList } from "../../../mocks/LottiesList";
import { dB } from "../../../mocks/hearingSoundList";

const TestSoundDisplayPage = ({ data }) => {
  const {
    hearingStore: {
      setCurrent,
      setBtnResultReady,
      ear,
      handleProcess,
      current,
      handleIsTesting,
      isTesting,
      data: dataList,
      processResult,
      hearingId,
    },
    commonStore: { user },
  } = useStore();

  const [soundObj, setSound] = useState();
  const [colorChange, setColorChange] = useState(true);

  const [progress, setProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(30);

  const [count, setCount] = useState(1);

  useEffect(() => {
    return () => (soundObj ? clear() : undefined);
  }, []);

  async function clear() {
    setProgress(0);
    setIsPlaying(false);
    if (soundObj) await soundObj.unloadAsync();
    setSound(null);
  }

  console.log("isPlaying out", isPlaying);

  const setVolumes = async () => {
    setVolume(30);
    let index = 0;

    const interval = setInterval(() => {
      if (index < dB.length) {
        console.log("volume", volume);
        console.log("isPlaying in", isPlaying);
        // if (!isPlaying) {
        //   clearInterval(interval); // หยุด setInterval เมื่อ isPlaying เป็นเท็จ
        //   return;
        // }

        setVolume(dB[index]);
        index++;

        console.log("index", index);
      } else {
        clearInterval(interval);
      }
    }, 6000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  };

  async function playSound() {
    setIsPlaying(true);
    setColorChange((colorChange) => !colorChange);

    if (soundObj) clear();

    const { sound } = await Audio.Sound.createAsync(data.soundUrl);

    setSound(sound);

    // await playSoundRepeatedly(sound);
    await sound.playFromPositionAsync(2000);

    await setVolumes();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && !status.isPlaying) {
        console.log(data.title, ": Sound playback finished");
        setIsPlaying(false);
        setBtnResultReady(true);

        //เพิ่มข้อมูลเข้า array เมื่อเล่นเสียงเสร็จสิ้นแล้ว
        handleProcess(data.id, dB[dB.length - 1]);

        setCount((count) => count + 1);
        if (count === 7) {
          processResult(user.id, ear);

          setCurrent(1);
          setBtnResultReady(false);
          handleIsTesting(false);
        }

        clear();
      } else if (status.isLoaded)
        setProgress((status.positionMillis / status.durationMillis) * 100);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleVolume}>{data.title.split("v")[1]} Hz</Text>

      {isPlaying ? (
        <View style={styles.progressStyle}>
          <LottieView
            source={lottieList.speaker}
            style={{ height: 240, borderColor: "red", borderWidth: 1 }}
            speed={0.7}
            autoPlay
            loop
          />
          <Progress value={progress} mx="4" />
          <Text
            style={{
              fontSize: 25,
              color: colorChange ? "red" : "white",
              backgroundColor: "black",
              padding: 10,
              borderRadius: 20,
            }}
          >
            dB: {volume}
          </Text>
        </View>
      ) : (
        <Button
          onPress={playSound}
          isDisabled={null}
          bgColor={theme.colors.bg.primary}
        >
          <Text style={styles.textBtn}>เล่นเสียง</Text>
        </Button>
      )}

      <View style={styles.btnProcess}>
        <Button
          isDisabled={!isPlaying ? true : false}
          onPress={async () => {
            handleProcess(data.id, volume);
            setCount((count) => count + 1);

            if (count === 7) {
              processResult(user.id, ear);

              setCurrent(1);
              setBtnResultReady(false);
              handleIsTesting(false);
            }

            clear();
          }}
          bgColor={theme.colors.bg.primary}
        >
          <Text style={styles.textBtn}>ได้ยิน</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, marginBottom: 20 },
  titleVolume: {
    textAlign: "center",
    fontSize: theme.fontSizes.h2,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginBottom: 10,
  },
  progressStyle: { marginVertical: 20, alignItems: "center" },
  btnProcess: { gap: 10, marginVertical: 20 },
  btnNext: {
    flex: 1,
    gap: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    color: theme.colors.text.light,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes.h4,
  },
});

export default observer(TestSoundDisplayPage);
