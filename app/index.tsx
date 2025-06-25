import Checkbox from 'expo-checkbox';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { matchFont } from "@shopify/react-native-skia";
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import { CartesianChart, Line, useChartTransformState } from "victory-native";


const initialXscale = 10;
const initialYscale = 1;
export default function Index() {

  const [myData, setMyData] = useState<any[]>([]);
  const [domain, setDomain] = useState({ x: [1546387200, 1546387200], y: [90, 150] });

  const resetDomain = () => {
    setDomain({ x: [1546387200, 1546387200], y: [90, 150] });
  }

  const transformState = useChartTransformState({
    scaleX: initialXscale, // Initial X-axis scale
    scaleY: initialYscale, // Initial Y-axis scale
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

  const [isOpenChecked, setOpenChecked] = useState(true);
  const [isCloseChecked, setCloseChecked] = useState(true);
  const [isLowChecked, setLowChecked] = useState(true);
  const [isHighChecked, setHighChecked] = useState(true);

  const drawLines = useCallback((points) => {
    return (
            <>
              {isOpenChecked && <Line points={points.open} color="red" strokeWidth={0.2} />}
              {isCloseChecked && <Line points={points.high} color="blue" strokeWidth={0.2} />}
              {isLowChecked && <Line points={points.low} color="yellow" strokeWidth={0.2} />}
              {isHighChecked && <Line points={points.close} color="green" strokeWidth={0.2} />}
            </>
        )
  }, [isOpenChecked, isCloseChecked, isLowChecked, isHighChecked]);

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
          domain={domain}
          axisOptions={{
            font,
            formatXLabel: x => {
              try {
                const date = new Date(Number(x));
                return date.toLocaleDateString("en-GB");
              } catch (error) {
                console.error('Error formatting date:', error);
                return x; // Fallback in case of error
              }
            },
            formatYLabel: y => {
              // console.log('Y: ', y);
              return `$${y}`
            },
          }}
          >
          {({ points }) => drawLines(points)}
        </CartesianChart>
      </View>
      <View style={styles.commandContainer}>
        <View style={{ flexDirection: 'column'}}>
          <Text>Display</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox style={styles.checkbox} value={isOpenChecked} onValueChange={() => setOpenChecked(!isOpenChecked)} />
            <Text>Open</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox style={styles.checkbox} value={isCloseChecked} onValueChange={() => setCloseChecked(!isCloseChecked)} />
            <Text>Close</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox style={styles.checkbox} value={isLowChecked} onValueChange={() => setLowChecked(!isLowChecked)} />
            <Text>Low</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox style={styles.checkbox} value={isHighChecked} onValueChange={() => setHighChecked(!isHighChecked)} />
            <Text>Low</Text>
          </View>
        </View>
        <TouchableOpacity onPress={resetDomain} style={{ padding: 8, backgroundColor: '#DEE1E6', borderRadius: 8 }}>
          <Text>Reset Zoom</Text>
        </TouchableOpacity>
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
    backgroundColor: '#DEE1E6',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 100, // 16,
    borderRadius: 10,
  },
  commandContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '400',
  },
  checkbox: {
    margin: 8,
  },
});
