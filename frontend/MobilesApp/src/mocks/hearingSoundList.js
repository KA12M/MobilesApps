// เตรียมข้อมูล
const dataList = { left: [], right: [] };

// ระดับความถี่
export let volume = ["v250", "v500", "v1000", "v2000", "v4000", "v8000"];

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
  const soundUrl = require(`../../assets/sounds/tick-tack-left.mp3`);
  const data = { id: index, isHeard: null, title: field, soundUrl };

  dataList.left.push(data);
  dataList.right.push(data);
}); 

export default dataList;
