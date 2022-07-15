import { Text, View } from "react-native";

type Props = {
  name?: String;
};

const GeneralTemplate = ({ name }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {name && <Text>{name}</Text>}
    </View>
  );
};

export default GeneralTemplate;
