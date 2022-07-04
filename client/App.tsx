import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // splash screen 설정
  // splash screen의 auto hide 옵션 해제
  // 2초 후 setAppisReady -> true
  const initSplashScreen = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  };

  // appIsReady가 true가 되는 순간 즉시(immediately) splash screen을 감춘다
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    initSplashScreen();
  }, []);

  if (!appIsReady) return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
