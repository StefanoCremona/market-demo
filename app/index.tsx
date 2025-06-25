import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { useMemo } from 'react';
import { CartesianChart, Line } from "victory-native";

export default function Index() {
  const DATA = useMemo(() => 
      Array.from({ length: 31 }, (_, i) => ({
      day: i,
      highTmp: 40 + 30 * Math.random(),
    })), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('@/assets/images/appleIcon.png')} style={styles.imageStyle} />
        <Text style={styles.titleText}>AAPL Market Data</Text>
      </View>
      <View style={styles.chartContainer}>
        <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
          {({ points }) => (
          // 👇 and we'll use the Line component to render a line path.
          <Line points={points.highTmp} color="red" strokeWidth={3} />
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
    marginTop: 16,
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
