import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { useEffect, useMemo, useState } from 'react';
import { CartesianChart, Line } from "victory-native";

export default function Index() {

  const [myData, setMyData] = useState<any[]>([]);

  const DATA = useMemo(() => 
      Array.from({ length: 31 }, (_, i) => ({
      day: i,
      highTmp: 40 + 30 * Math.random(),
    })), []);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/892843-874692-default/marketdata/history/AAPL')
      .then(response => response.json())
      .then(response => {
        console.log('Got response:', response.data[0]);
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
        <CartesianChart data={myData} xKey="timestamp" yKeys={["open", "high", "low", "close"]}>
          {({ points }) => (
            <>
              <Line points={points.open} color="red" strokeWidth={3} />
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
