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
const zH250 = require("../../assets/sounds/250Hz_sine-wave.mp4");
const zH500 = require("../../assets/sounds/500Hz_sine-wave.mp3");

export const sound = [zH1000, zH2000, zH4000, zH6000, zH8000, zH250, zH500];

// export const dB = [-10, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
export const dB = [
  30, 20, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 91,
];

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

// สร้างฟังก์ชันสำหรับสลับลำดับของอาร์เรย์
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// สลับลำดับของเสียง
shuffleArray(dataList.left);
shuffleArray(dataList.right);

export default dataList;

export const radio = [
  {
    label: "ไม่เคย",
    value: "0",
  },
  {
    label: "เป็นครั้งคราว",
    value: "1",
  },
  {
    label: "ครั้งหนึ่ง",
    value: "2",
  },
  {
    label: "เกือบตลอด",
    value: "3",
  },
];

export const questions = [
  { id: 1, text: "ฉันมีปัญหาในการฟังเสียงโทรศัพท์" },
  {
    id: 2,
    text: "ฉันมีความลําบากที่จะปะติดปะต่อเรื่องที่สนทนาเวลามีคนตั้งแต่ 2 คนขึ้นไปพูดพร้อมกัน",
  },
  { id: 3, text: "คนทั่วไปบ่นว่าฉันเปิดทีวีเสียงดัง" },
  { id: 4, text: "ฉันต้องพยายามอย่างหนักที่จะเข้าใจการสนทนา" },
  { id: 5, text: "ฉันไม่ได้ยินเสียงทั่วๆไป เช่น โทรศัพท์หรือกริ่งประตู" },
  {
    id: 6,
    text: "ฉันมีความลําบากในการฟังการสนทนาในที่ที่มีเสียงรบกวน เช่น งานเลี้ยง",
  },
  { id: 7, text: "ฉันรู้สึกสับสนว่าเสียงมาจากทางไหน" },
  { id: 8, text: "ฉันไม่เข้าใจคําบางคําในประโยคและจําเป็นต้องขอให้คนพูดซ้ำ" },
  {
    id: 9,
    text: "ฉันมีปัญหาโดยเฉพาะอย่างยิ่งในการทําความเข้าใจคําพูดของผู้หญิงและเด็ก",
  },
  {
    id: 10,
    text: "ฉันทํางานในที่ๆมีเสียงดัง เช่น โรงงาน ขุดเจาะถนน เครื่องจักรไอพ่น เป็นต้น",
  },
  { id: 11, text: "คนหลายคนที่ฉันคุยด้วยดูเหมือนจะพูดพึมพัมหรือพูดไม่ชัด" },
  { id: 12, text: "คนทั่วไปรู้สึกรําคาญ เพราะฉันไม่เข้าใจว่าเขาพูดอะไร" },
  {
    id: 13,
    text: "ฉันไม่เข้าใจในสิ่งที่คนอื่นกําลังพูดทําให้ตอบสนองไม่เหมาะสม",
  },
  {
    id: 14,
    text: "ฉันเลี่ยงงานสังคม เพราะว่าฉันได้ยินไม่ดีและกลัวว่าจะตอบไม่ตรงคําถาม",
  },
  {
    id: 15,
    text: "ข้อนี้ให้คนในครอบครัวหรือเพื่อนตอบคำถามแทน  คุณคิดว่าบุคคลนี้มีปัญหาการได้ยินหรือไม่",
  },
];
