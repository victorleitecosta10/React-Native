import React, { useContext, useState } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { AreaInput, Background, Container, Input, Link, LinkText, Logo, SubmitButton, SubmitText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >
        <Logo source={require("../../assets/Logo.png")} />

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#fff" />
            ) : (
              <SubmitText>Acessar</SubmitText>
            )
          }
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>

      </Container>
    </Background>
  );
}
