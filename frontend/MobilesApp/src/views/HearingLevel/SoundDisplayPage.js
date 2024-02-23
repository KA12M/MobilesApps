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

  useEffect(() => {
    return () => (soundObj ? clear() : undefined);
  }, []);

  function clear() {
    console.log(data.title, ": Unloading Sound");
    setProgress(0);
    setBtnPlayIsReady(true);
    setIsPlaying(false);
    if (soundObj) soundObj.unloadAsync();
    setSound(null);
  }

  async function playSound() {
    if (soundObj) clear();

    setIsPlaying(true);
    setBtnPlayIsReady(false);

    console.log(data.title, ": Loading Sound");
    const { sound } = await Audio.Sound.createAsync(data.soundUrl);
    setSound(sound);

    console.log(data.title, ": Playing Sound");
    await sound.playAsync();

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
          <Text> dB: {mapPercentageToValue(progress)}</Text>
        </View>
      ) : (
        <Button
          onPress={playSound}
          isDisabled={!btnPlayIsReady}
          bgColor={theme.colors.bg.primary}
        >
          <Text style={styles.textBtn}>เล่นเสียง</Text>
        </Button>
      )}

      <View style={styles.btnProcess}>
        <Button
          isDisabled={btnPlayIsReady}
          onPress={() => {
            handleProcess(data.id, mapPercentageToValue(progress));
            clear();
          }}
          bgColor={theme.colors.bg.primary}
        >
          <Text style={styles.textBtn}>ได้ยิน</Text>
        </Button>
        <Button
          isDisabled={btnPlayIsReady}
          variant="ghost"
          colorScheme="danger"
          onPress={() => {
            handleProcess(data.id, 9999);
            clear();
          }}
        >
          <Text style={{ ...styles.textBtn, color: "red" }}>ไม่ได้ยิน</Text>
        </Button>
      </View>

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
    color: theme.colors.text.black,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes.h4,
  },
});

export default observer(SoundDisplayPage);
