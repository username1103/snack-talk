import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { LoginScreen, SplashScreen } from "./screens";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setAppIsReady(true), 3000);
  }, []);

  if (!appIsReady) return <SplashScreen />;
  return (
    <>
      <StatusBar style="auto" />
      <LoginScreen />
    </>
  );
}
