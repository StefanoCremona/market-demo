import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { matchFont } from "@shopify/react-native-skia";
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { CartesianChart, Line, useChartTransformState } from "victory-native";


export default function Index() {

  const [myData, setMyData] = useState<any[]>([]);

  const transformState = useChartTransformState({
    scaleX: 10, // Initial X-axis scale
    scaleY: 1, // Initial Y-axis scale
  });

  const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
  const fontStyle = {
    fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
  };
  const font = matchFont(fontStyle);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/892843-874692-default/marketdata/history/AAPL')
      .then(response => response.json())
      .then(response => {
        setMyData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('@/assets/images/appleIcon.png')} style={styles.imageStyle} />
        <Text style={styles.titleText}>AAPL Market Data</Text>
      </View>
      <View style={styles.chartContainer}>
        <CartesianChart
          data={myData}
          xKey="timestamp"
          yKeys={["open", "high", "low", "close"]}
          transformState={transformState.state}
          axisOptions={{
            font,
          }}
          >
          {({ points }) => (
            <>
              <Line points={points.open} color="red" strokeWidth={0.2} />
              <Line points={points.high} color="blue" strokeWidth={0.2} />
              <Line points={points.low} color="yellow" strokeWidth={0.2} />
              <Line points={points.close} color="green" strokeWidth={0.2} />
            </>
        )}
        </CartesianChart>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 47,
    width: 51,
    marginRight: 8,
    borderRadius: 8,
  },
  chartContainer: {
    height: 300,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 100, // 16,
    backgroundColor: '#DEE1E6',
    borderRadius: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '400',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
