import { StackNavigationProp } from "@react-navigation/stack";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { color } from "../../styles/color";

type LoginScreenNavigationProp = StackNavigationProp<
  { Login: undefined; SetProfile: undefined },
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.primary,
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../styles/images/logo-white.png")}
          resizeMethod="resize"
          resizeMode="contain"
          style={{ width: 150, marginTop: 10 }}
        />
      </View>
      <View
        style={{
          backgroundColor: color.neutral,
          flex: 3,
          minHeight: 200,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 30,
          paddingVertical: 40,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 10,
          shadowOpacity: 0.06,
        }}
      >
        {/* paragraph */}
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            시작하기
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "300" }}>
            휴대전화 인증을 통해 간단히 스낵톡을 시작해보세요!
          </Text>
        </View>
        {/* form */}
        <View style={{ flex: 1, marginTop: 20, flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#bfbfbf",
              height: 40,
              marginBottom: 15,
            }}
          >
            <TextInput
              placeholder="휴대전화번호"
              style={{
                flex: 1,
                marginRight: 10,
                fontSize: 12,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: color.secondary,
                height: 22,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 8,
                borderRadius: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                인증요청
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#bfbfbf",
              height: 40,
              marginBottom: 20,
            }}
          >
            <TextInput
              placeholder="인증번호 6자리"
              style={{
                flex: 1,
                fontSize: 12,
              }}
            />
          </View>
          <View
            style={{
              height: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.push("SetProfile")}
              style={{
                flex: 1,
                backgroundColor: color.secondary,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                인증 후 시작하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
