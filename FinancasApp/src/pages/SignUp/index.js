import React, { useContext, useState } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { AreaInput, Background, Container, Input, Logo, SubmitButton, SubmitText } from "../SignIn/styles";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSignUp() {
    signUp(name, email, password);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >

        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </AreaInput>

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

        <SubmitButton onPress={handleSignUp}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#fff" />
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            )
          }

        </SubmitButton>

      </Container>
    </Background>
  );
}
