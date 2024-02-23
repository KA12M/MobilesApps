export function mapPercentageToValue(percentage) {
  if (percentage < 0) {
    return -10; // ถ้าเปอร์เซ็นต์น้อยกว่า 0% ให้คืนค่า -10
  } else if (percentage >= 100) {
    return 120; // ถ้าเปอร์เซ็นต์มากกว่าหรือเท่ากับ 100% ให้คืนค่า 120
  } else {
    // คำนวณค่าตรงกลางขึ้นอยู่กับเปอร์เซ็นต์
    const minValue = -10;
    const maxValue = 120;
    const range = maxValue - minValue;
    const mappedValue = minValue + range * (percentage / 100);
    return Math.round(mappedValue); // ปัดค่าลงเป็นจำนวนเต็ม
  }
}
