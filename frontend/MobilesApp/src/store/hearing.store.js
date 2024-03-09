import { makeAutoObservable, runInAction } from "mobx";

import SoundList, { volume } from "../mocks/hearingSoundList";

import API from "./api/agent";

export default class HearingStore {
  data = { left: [], right: [] };
  result = null;
  current = 1;
  btnResultReady = false;
  ear = "";
  isTesting = false;
  goBack = true;

  constructor() {
    makeAutoObservable(this);

    this.data = SoundList;
  }

  setGoBack = (state) => (this.goBack = state);

  addHearingByUserId = async (data) => {
    try {
      var res = await API.hearing.createHearing(data);
      console.log("res :", res);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  setCurrent = (num) => (this.current = num);
  setBtnResultReady = (bool) => (this.btnResultReady = bool);

  // ประมวลผล
  handleProcess = (id, volume) => {
    this.data[this.ear] = this.data[this.ear].map((el) => {
      if (el.id == id) el.isHeard = volume;
      return el;
    });
    this.setCurrent(
      this.current <= this.data[this.ear].length
        ? this.current + 1
        : this.current
    );
  };

  // เริ่มทดสอบ
  handleIsTesting = (bool = true) => (this.isTesting = bool);
  setEar = (ear) => (this.ear = ear);

  // ประมวลผลข้อมูลลง result
  processResult = (userId, navigation) => {
    const result = transformData(this.data);

    this.result = result;

    const data = {
      userId: userId,
      note: "",
      ...result,
    };

    console.log("data send", data);

    this.addHearingByUserId(data).then(() => {
      navigation.goBack();
    });
  };

  // เช็คความพร้อมของข้อมูล
  checkResultReady = () => {
    const notHeardCount = this.data.filter((item) => item.isHeard != 0).length;

    const percentNotHeard = (notHeardCount / this.data.length) * 100;

    return {
      notHeardCount,
      percentNotHeard,
      valid: notHeardCount == this.data.length,
    };
  };

  // ล้างข้อมูลที่ประมวลผล
  clearResult = () => (this.result = null);

  // สร้างข้อมูล hearing ไป API
  newHearing = async (userId) => {
    if (!this.result) return;

    this.result.userId = userId;
    try {
      // var response = await agent.hearing.createHearing(formData);
      runInAction(() => {
        // console.log(response);
        // TODO: after new hearing...
      });
    } catch (error) {
      throw error;
    }
  };

  clearResults = () => {
    this.data = SoundList;
    this.ear = "";
    this.current = 1;
    this.result = null;
    this.isTesting = false;
    this.btnResultReady = false;
  };
}

// function แปลงข้อมูลซ้ายขวาที่ใช้ในแอพเป็นข้อมูลที่จะบันทึกลง db
function transformData(dataList) {
  // ตั้งต้นข้อมูลที่จะส่งไป API
  const transformedData = { items: [] };

  // ลูปข้อมูลของหูซ้ายขวา
  for (let ear = 0; ear < 2; ear++) {
    const item = {
      ear: ear,
    };

    // ลูปข้อมูลเพิ่มฟีลตาม volume
    dataList[ear == 0 ? "left" : "right"].forEach((el) => {
      item[el.title] = el.isHeard ?? 0;
    });

    item["result"] = processHearing(item);

    // เพิ่มข้อมูลเข้า
    transformedData.items.push(item);
  }

  console.log("new", JSON.stringify(transformedData, null, 2));

  return transformedData;
}

function processHearing(item) {
  let count = 0;
  let value = 0;
  volume.forEach((key) => {
    console.log(item[key]);
    if (item[key]) {
      value += item[key];
      count++;
    }
  });

  let result = value / count;
  switch (true) {
    case result > 90:
      return "ระดับหูหนวก";
    case result >= 71:
      return "ระดับรุนแรง";
    case result >= 56:
      return "ระดับปานกลางค่อนข้างรุนแรง";
    case result >= 41:
      return "ระดับปานกลาง";
    case result >= 26:
      return "ระดับน้อย";
    case result >= -10:
      return "การได้ยินปกติ";
    default:
      return "Invalid input";
  }
}
