import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SplashScreen } from "./screens";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setAppIsReady(true), 3000);
  }, []);

  if (!appIsReady) return <SplashScreen />;
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
