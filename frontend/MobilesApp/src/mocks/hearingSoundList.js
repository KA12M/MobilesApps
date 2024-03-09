// เตรียมข้อมูล
const dataList = { left: [], right: [] };

// ระดับความถี่
export let volume = [
  "v1000",
  "v2000",
  "v4000",
  "v6000",
  "v8000",
  "v250",
  "v500",
];

const zH1000 = require("../../assets/sounds/1000Hz_sine-wave.mp3");
const zH2000 = require("../../assets/sounds/2000Hz_sine-wave.mp3");
const zH4000 = require("../../assets/sounds/4000Hz_sine-wave.mp3");
const zH6000 = require("../../assets/sounds/6000Hz_sine-wave.mp3");
const zH8000 = require("../../assets/sounds/8000Hz_sine-wave.mp3");
const zH250 = require("../../assets/sounds/260Hz_sine-wave.mp3");
const zH500 = require("../../assets/sounds/500Hz_sine-wave.mp3");

export const sound = [zH1000, zH2000, zH4000, zH6000, zH8000, zH250, zH500];

export const dB = [-10, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

// for (let i = 0; i < 2; i++) {
//   for (let v = 0; v < volume.length; v++) {
//     const id = i * volume.length + v + 1;
//     const leftRight = i;
//     const isHeard = 999;
//     const soundUrl = require(`../../assets/sounds/tick-tack-left.mp3`);

//     dataList.push({
//       id: id,
//       title: volume[v],
//       isHeard: isHeard,
//       soundUrl: soundUrl,
//       leftRight: leftRight,
//     });
//   }
// }

// ลูปข้อมูลจาก volume ลงข้อมูลทั้งซ้ายและขวา
volume.forEach((field, index) => {
  const soundUrl = sound[index];
  const data = { id: index, isHeard: null, title: field, soundUrl };

  dataList.left.push(data);
  dataList.right.push(data);
});

export default dataList;
