import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SetProfileScreen } from ".";

const LoginStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SetProfile" component={SetProfileScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;
