function checkHearingLevel({ v500, v1000, v2000 }) {
  let PTA = (v500, v1000, v2000) / 3;

  if (PTA >= -10 && PTA <= 25) {
    return "การได้ยินปรกติ";
  } else if (PTA >= 26 && PTA <= 40) {
    return "ระดับน้อย ";
  } else if (PTA >= 41 && PTA <= 55) {
    return "ระดับปานกลาง";
  } else if (PTA >= 56 && PTA <= 70) {
    return "ระดับปานกลางค่อนข้างรุนแรง";
  } else if (PTA >= 71 && PTA <= 90) {
    return "ระดับรุนแรง";
  } else if (PTA > 90) {
    return "ระดับหูหนวก";
  } else {
    return "ข้อมูลไม่ถูกต้อง";
  }
}
