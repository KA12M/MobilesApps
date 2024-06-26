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
  hearingByUser = [];
  hearingResult = "";
  resultDoctor = "";
  loading = false;
  hearingId = null;
  FMHTByUser = [];

  constructor() {
    makeAutoObservable(this);

    this.data = SoundList;
  }

  setLoading = (state) => (this.loading = state);

  setGoBack = (state) => (this.goBack = state);

  createFMHTByUserId = async (data) => {
    try {
      var res = await API.fmht.createFMHT(data);
      return res;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  getFMHTByUserId = async (userId) => {
    try {
      const res = await API.fmht.GetFMHTByUserId(userId);

      runInAction(() => {
        this.FMHTByUser = res;
      });
    } catch (error) {
      throw error;
    }
  };

  getHearingByUserId = async (userId) => {
    this.setLoading(true);
    try {
      var res = await API.diabete.hearingWithDiabeteList(userId);
      runInAction(() => {
        this.hearingByUser = res?.hearing?.value;
      });
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      throw error;
    }
  };

  addHearingByUserId = async (data) => {
    try {
      var res = await API.hearing.createHearing(data);
      console.log("res add :", res);
      return res;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  updateHearingItemById = async (data, hearingId) => {
    try {
      var res = await API.hearing.updateHearing(data, hearingId);
      console.log("res update :", res);
      return res;
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
      if (el.id == id) el.isHeard = volume === 0 ? 30 : volume;
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
  processResult = async (userId, ear) => {
    const result = transformData(this.data);

    this.result = result;

    const data = {
      userId: userId,
      note: "",
      ...result,
    };

    const dataForm = ear === "left" ? data.items[0] : data.items[1];

    console.log("data send", dataForm);

    console.log("this.hearingId", this.hearingId);

    if (this.hearingId === null) {
      const res = await this.addHearingByUserId({ ...data, items: [dataForm] });

      this.hearingId = res.id;

      console.log("this.hearingId", this.hearingId);
      console.log("res add p", res);
    } else {
      await this.updateHearingItemById(dataForm, this.hearingId);

      this.hearingId = null;
      console.log("res update");
    }

    // this.addHearingByUserId(data).then(() => {
    //   navigation.goBack();
    // });
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

  processHearingLevels = (data) => {
    let arrayHearing = [];
    data.map((item) => {
      const { ear, v500, v1000, v2000 } = item;

      const total = (v500 + v1000 + v2000) / 3;

      arrayHearing = [...arrayHearing, { id: ear, name: check(total) }];
    });

    runInAction(() => {
      this.hearingResult = arrayHearing;
    });
  };

  processResultDoctor = (data) => {
    let arrayResult = [];
    data.map((item) => {
      const { v500, v1000, v2000, v4000 } = item;

      const total = (v500 + v1000 + v2000 + v4000) / 4;

      // console.log("total", v500, v1000, v2000, v4000);
      arrayResult = [...arrayResult, total];
    });

    runInAction(() => {
      this.resultDoctor = arrayResult;
    });
  };

  reCheckEachValue = (value) => check(value);
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
  return check(result);
}

function check(result) {
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
