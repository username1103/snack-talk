import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SplashScreen } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginStack, HomeScreen } from "./screens";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const Stack = createStackNavigator();

  useEffect(() => {
    setTimeout(() => setAppIsReady(true), 3000);
  }, []);

  if (!appIsReady) return <SplashScreen />;
  // 직관적으로 종속된다면 grouping
  // 글로벌하게 쓰이는 스크린(모달)이라면 상위에 nesting
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginStack" component={LoginStack} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
