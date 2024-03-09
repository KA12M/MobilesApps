import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { theme } from "../infrastructure/theme";
import { Audio } from "expo-av";

const TestPage = () => {
  const [soundObj, setSound] = useState();

  useEffect(() => {
    playSound();
  }, []);

  const dB = [-10, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

  const playSoundRepeatedly = async (sound, repetitions) => {
    let volume = 30;

    for (let i = 0; i < repetitions; i++) {
      console.log("volume", volume);

      await sound.playAsync();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await sound.stopAsync();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      volume += dB[i];

      sound.setVolumeAsync(volume / 100, 0.0);
    }
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/Test1000Hz.mp3"),
      { volume: 0.3 }
    );

    setSound(sound);

    await playSoundRepeatedly(sound, 16);
  };

  async function stopSound() {
    if (soundObj) await soundObj.stopAsync();
    setSound(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleVolume}>1000 Hz</Text>
      {/* <Button title="Play Sound" onPress={playSound} /> */}
      <Button title="stop Sound" onPress={stopSound} />
    </View>
  );
};

export default TestPage;

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
