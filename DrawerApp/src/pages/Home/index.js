import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <Button title="Contato" onPress={() => navigation.navigate("Contato")} />
      <Button title="Abrir menu" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

export default Home;
