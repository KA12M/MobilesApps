import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, StyleSheet } from "react-native";
import { Button, Progress } from "native-base";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";

import { useStore } from "../../store/store";
import { mapPercentageToValue } from "../../utils/mapPercent";
import { theme } from "./../../infrastructure/theme/index";
import { lottieList } from "../../mocks/LottiesList";
import { dB } from "../../mocks/hearingSoundList";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SoundDisplayPage = ({ data }) => {
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
  const [btnPlayIsReady, setBtnPlayIsReady] = useState(true);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(30);

  const [count, setCount] = useState(0);

  const [colorChange, setColorChange] = useState(true);

  useEffect(() => {
    return () => (soundObj ? clear() : undefined);
  }, []);

  async function clear() {
    // console.log(data.title, ": Unloading Sound");
    setProgress(0);
    setBtnPlayIsReady(true);
    setIsPlaying(false);
    await soundObj.stopAsync();
    if (soundObj) await soundObj.unloadAsync();
    setSound(null);
  }

  const playSoundRepeatedly = async (sound) => {
    // let delay = 3000;
    let delay = 3000;

    await sound.playFromPositionAsync(2000);
    await sound.playAsync();

    for (let i = 0; i < dB.length; i++) {
      console.log("i", i);
      console.log("dB", dB[i]);

      if (isPlaying) {
        // await sound.setVolumeAsync(dB[i] / 100.0, 0.0);

        setVolume(dB[i]);

        await new Promise((resolve) => setTimeout(resolve, delay));
        // await sound.stopAsync();
        await new Promise((resolve) => setTimeout(resolve, delay));
        // await sound.playAsync();
        setColorChange((colorChange) => !colorChange);
      }
    }

    // dB.map(async (_, i) => {
    //   await sound.setVolumeAsync(dB[i] / 100, 0.0);
    //   await sound.playAsync();
    //   await new Promise((resolve) => setTimeout(resolve, delay));
    //   await sound.stopAsync();
    //   await new Promise((resolve) => setTimeout(resolve, delay));
    //   await sound.playAsync();
    //   await new Promise((resolve) => setTimeout(resolve, delay));
    //   await sound.stopAsync();
    //   await new Promise((resolve) => setTimeout(resolve, delay));
    //   setVolume(dB[i]);
    // });
    console.log("before if isTesting", count);

    // if (isTesting) {
    //   handleProcess(data.id, dB[dB.length - 1]);
    //   clear();
    // } else {
    //   clear();
    // }

    handleProcess(data.id, dB[dB.length - 1]);
    clear();

    console.log("before if count === 7", count);

    if (count === 6) {
      processResult(user.id, ear);

      console.log("count === 6", count);

      setCurrent(1);
      setBtnResultReady(false);
      handleIsTesting(false);

      clear();
    }

    await sound.stopAsync();
  };

  async function playSound() {
    setCount((count) => count + 1);
    setColorChange((colorChange) => !colorChange);
    setProgress(30);
    setVolume(30);

    // console.log("setCount playsound", count);

    if (soundObj) clear();

    setIsPlaying(true);
    setBtnPlayIsReady(false);

    // console.log(data.title, ": Loading Sound");
    const { sound } = await Audio.Sound.createAsync(data.soundUrl);

    setSound(sound);

    // console.log(data.title, ": Playing Sound");
    await sound.playAsync();

    // await playSoundRepeatedly(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && !status.isPlaying) {
        console.log(data.title, ": Sound playback finished");
        setBtnPlayIsReady(true);
        setIsPlaying(false);
        setBtnResultReady(true);
        handleProcess(data.id, dB[dB.length - 1]);
        clear();

        // console.log("before if count === 7", count);

        if (count === 6) {
          processResult(user.id, ear);

          // console.log("count === 6", count);

          setCurrent(1);
          setBtnResultReady(false);
          handleIsTesting(false);

          clear();
        }
      } else if (status.isLoaded)
        setProgress((status.positionMillis / status.durationMillis) * 100);
    });
  }

  // console.log("volume", volume);

  return (
    <View style={styles.container}>
      {/* {count === 7 ? (
        <Text style={styles.titleVolume}>เสร็จสิ้น</Text>
      ) : ( */}
      <Text style={styles.titleVolume}>{data.title.split("v")[1]} Hz</Text>
      {/* )} */}

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
          <Text> ความดัง: {mapPercentageToValue(progress)}</Text>
          {/* <Text
            style={{
              fontSize: 25,
              color: colorChange ? "red" : "white",
              backgroundColor: "black",
              padding: 10,
              borderRadius: 20,
            }}
          >
            dB: {volume}
          </Text> */}
        </View>
      ) : (
        <Button
          onPress={playSound}
          isDisabled={count > 7 ? btnPlayIsReady : !btnPlayIsReady}
          bgColor={theme.colors.bg.primary}
        >
          <Text style={styles.textBtn}>เล่นเสียง</Text>
        </Button>
      )}

      <View style={styles.btnProcess}>
        <Button
          isDisabled={btnPlayIsReady}
          onPress={async () => {
            handleProcess(data.id, mapPercentageToValue(progress));
            clear();

            await soundObj.stopAsync();

            if (count === 7) {
              console.log("count === 7", count);
              processResult(user.id, ear);

              setCurrent(1);
              setBtnResultReady(false);
              handleIsTesting(false);
            }
          }}
          bgColor={theme.colors.bg.primary}
        >
          <Text style={styles.textBtn}>ได้ยิน</Text>
        </Button>
        {/* <Button
          isDisabled={btnPlayIsReady}
          variant="ghost"
          colorScheme="danger"
          onPress={() => {
            handleProcess(data.id, 9999);
            clear();
          }}
        >
          <Text style={{ ...styles.textBtn, color: "red" }}>ไม่ได้ยิน</Text>
        </Button> */}
      </View>

      {/* <View style={styles.btnNext}>
        {current > dataList[ear].length && (
          <Button
            onPress={() => {
              setCurrent(1);
              setBtnResultReady(false);
              handleIsTesting("", false);
            }}
            bgColor={theme.colors.bg.primary}
            isDisabled={isPlaying}
          >
            <Text style={styles.textBtn}>กลับ</Text>
          </Button>
        )}
      </View> */}
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

export default observer(SoundDisplayPage);