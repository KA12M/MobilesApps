import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export const ShowLineChart = ({ data }) => {
  const filterData = (data) => {
    return Object.entries(data)
      .map(([key, value]) => {
        if (key.startsWith("v")) {
          return value;
        } else {
          return undefined; // ให้ return undefined เมื่อไม่ใช่ key ที่เริ่มต้นด้วย "v"
        }
      })
      .filter((value) => value !== undefined);
  };

  return (
    <LineChart
      data={{
        labels: ["250", "500", "1000", "2000", "4000", "6000", "8000"],
        datasets: data.map((item, i) => {
          console.log("i", i);

          const color = item.ear === 0 ? true : false;

          return {
            data: filterData(item),
            color: (opacity = 1) =>
              color
                ? `rgba(255, 0, 0, ${opacity})`
                : `rgba(0, 0, 255, ${opacity})`, // เปลี่ยนสีเส้นเส้นข้อมูลที่ 1 เป็นสีแดง
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: color ? "#FF0000" : "#0000FF", // เปลี่ยนสีจุดข้อมูลที่ 1 เป็นสีแดง
            },
          };
        }),
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      // yAxisLabel="10"
      // yAxisSuffix="k"
      yAxisInterval={5} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#FFFFFF", // White background color
        backgroundGradientFrom: "#FFFFFF", // White background gradient from
        backgroundGradientTo: "#FFFFFF", // White background gradient to
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for lines
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#000000", // Black color for dots
        },
      }}
      bezier={false}
    />
  );
};
