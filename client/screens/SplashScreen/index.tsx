import React, { useEffect } from "react";
import { Animated, Image, View } from "react-native";

const SplashScreen = () => {
  const wave1Position = new Animated.Value(0);
  const wave2Position = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(wave1Position, {
          toValue: 100,
          duration: 4000,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.timing(wave2Position, {
          toValue: 100,
          duration: 4000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const wave1InterpolateX = wave1Position.interpolate({
    inputRange: [0, 25, 50, 75, 100],
    outputRange: [5, 0, 5, 10, 5],
  });

  const wave1InterpolateY = wave1Position.interpolate({
    inputRange: [0, 85, 90, 95, 100],
    outputRange: [100, 10, 5, 0, 5],
  });

  const wave2InterpolateX = wave2Position.interpolate({
    inputRange: [0, 25, 50, 75, 100],
    outputRange: [5, 10, 5, 0, 5],
  });

  const wave2InterpolateY = wave2Position.interpolate({
    inputRange: [0, 85, 90, 95, 100],
    outputRange: [50, 10, 5, 0, 5],
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "35%",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="contain"
          source={require("./images/logo.png")}
          style={{ width: 140, height: 60 }}
        />
      </View>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          justifyContent: "flex-end",
          alignItems: "center",
          transform: [
            { translateY: wave1InterpolateY },
            { translateX: wave1InterpolateX },
          ],
        }}
      >
        <Image
          resizeMethod="resize"
          resizeMode="cover"
          style={{ width: "110%", height: "110%" }}
          source={require("./images/wave-vector-1.png")}
        />
      </Animated.View>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          justifyContent: "flex-end",
          alignItems: "center",
          transform: [
            { translateY: wave2InterpolateY },
            { translateX: wave2InterpolateX },
          ],
        }}
      >
        <Image
          resizeMethod="resize"
          resizeMode="cover"
          style={{ width: "110%", height: "110%" }}
          source={require("./images/wave-vector-2.png")}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
