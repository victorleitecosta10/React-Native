import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 25 }}>
        < Image
          source={require("../../assets/Logo.png")}
          style={{ width: 85, height: 85 }}
          resizeMode="contain"
        />

        <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>
          Bem-vindo
        </Text>

        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold", paddingBottom: 25 }}>
          {user && user.name}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        {...props}
        label="Sair do app"
        inactiveBackgroundColor="#c62c36"
        onPress={() => signOut()}
      />

    </DrawerContentScrollView>
  );
}
