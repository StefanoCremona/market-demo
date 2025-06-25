import { StyleSheet, Text, View } from 'react-native';

import { useMemo } from 'react';
import { CartesianChart, Line } from "victory-native";

export default function Index() {
  const DATA = useMemo(() => 
      Array.from({ length: 31 }, (_, i) => ({
      day: i,
      highTmp: 40 + 30 * Math.random(),
    })), []);
  return (
    <View style={styles.titleContainer}>
      <Text>Welcome to my Page!</Text>
      <View style={{ height: 300, width: '100%' }}>
        <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
          {({ points }) => (
          // 👇 and we'll use the Line component to render a line path.
          <Line points={points.highTmp} color="red" strokeWidth={3} />
        )}
        </CartesianChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
