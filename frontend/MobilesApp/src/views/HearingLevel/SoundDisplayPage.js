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
      data: dataList,
    },
  } = useStore();

  const [soundObj, setSound] = useState();
  const [btnPlayIsReady, setBtnPlayIsReady] = useState(true);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(30);

  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => (soundObj ? clear() : undefined);
  }, []);

  async function clear() {
    console.log(data.title, ": Unloading Sound");
    setProgress(0);
    setBtnPlayIsReady(true);
    setIsPlaying(false);
    if (soundObj) await soundObj.unloadAsync();
    setSound(null);
    setVolume(30);
  }

  const playSoundRepeatedly = async (sound, repetitions) => {
    let volume = 30;

    for (let i = 0; i < repetitions; i++) {
      console.log("volume", volume);

      await sound.playAsync();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await sound.stopAsync();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await sound.playAsync();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await sound.stopAsync();
      await sound.setVolumeAsync(volume / 100, 0.0);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      volume += dB[i];

      setVolume(volume);
    }

    console.log("volume", volume);

    handleProcess(data.id, 0);
    setCount((count) => count + 1);
    clear();
    setVolume(30);
  };

  async function playSound() {
    setVolume(30);

    if (soundObj) clear();

    setIsPlaying(true);
    setBtnPlayIsReady(false);

    console.log(data.title, ": Loading Sound");
    const { sound } = await Audio.Sound.createAsync(data.soundUrl, {
      volume: 0.3,
    });

    setSound(sound);

    console.log(data.title, ": Playing Sound");

    await playSoundRepeatedly(sound, 16);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && !status.isPlaying) {
        console.log(data.title, ": Sound playback finished");
        setBtnPlayIsReady(true);
        setIsPlaying(false);
        setBtnResultReady(true);
      } else if (status.isLoaded)
        setProgress((status.positionMillis / status.durationMillis) * 100);
    });
  }

  console.log("count", count);

  return (
    <View style={styles.container}>
      {count === 7 ? (
        <Text style={styles.titleVolume}>เสร็จสิ้น</Text>
      ) : (
        <Text style={styles.titleVolume}>{data.title.split("v")[1]} Hz</Text>
      )}

      {count !== 7 && (
        <>
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
              {/* <Text> progress: {mapPercentageToValue(progress)}</Text> */}
              <Text> dB: {volume}</Text>
            </View>
          ) : (
            <Button
              onPress={playSound}
              isDisabled={count === 7 ? btnPlayIsReady : !btnPlayIsReady}
              bgColor={theme.colors.bg.primary}
            >
              <Text style={styles.textBtn}>เล่นเสียง</Text>
            </Button>
          )}

          <View style={styles.btnProcess}>
            <Button
              isDisabled={btnPlayIsReady}
              onPress={() => {
                handleProcess(data.id, volume);
                setCount((count) => count + 1);
                clear();
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
        </>
      )}

      <View style={styles.btnNext}>
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

export default observer(SoundDisplayPage);
