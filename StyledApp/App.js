import React from "react";
import { BotaoSujeito, BotaoTexto, Container, Nome, Titulo } from "./src/styles";

export default function App() {
  return (
    <Container>
      <Titulo cor="#FF0000">Sujeito Programador</Titulo>
      <Nome>Olá Victor</Nome>

      <BotaoSujeito onPress={() => alert("Clicou")}>
        <BotaoTexto>Entrar</BotaoTexto>
      </BotaoSujeito>
    </Container>
  );
}
