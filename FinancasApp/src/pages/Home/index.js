import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import { Area, Background, Container, List, Nome, Saldo, Title } from "./styles";
import HistoricoList from "../../components/HistoricoList";
import firebaseConnection from "../../services/firebaseConnection";
import { format, isBefore } from "date-fns";
import { Alert, Platform, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DatePicker from "../../components/DatePicker";

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;
  const nome = user && user.name;
  const regex = /(\d)(?=(\d{3})+(?!\d))/g;

  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList() {
      await firebaseConnection.database().ref("users").child(uid).on("value", (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebaseConnection.database().ref("historico")
        .child(uid)
        .orderByChild("date").equalTo(format(newDate, "dd/MM/yyyy"))
        .limitToLast(10).on("value", (snapshot) => {
          setHistorico([]);

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };

            setHistorico(oldArray => [list, ...oldArray]);
          });
        });
    }

    loadList();
  }, [newDate]);

  function handleDelete(data) {

    const [diaItem, mesItem, anoItem] = data.date.split("/");
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    const formatDateHoje = format(new Date(), "dd/MM/yyyy");
    const [diaHoje, mesHoje, anoHoje] = formatDateHoje.split("/");

    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if (isBefore(dateItem, dateHoje)) {
      alert("Você não pode excluir um registro antigo!");
      return;
    }

    Alert.alert(
      "Cuidado Atenção!",
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleDeleteSuccess(data),
        },
      ],
    );
  }

  async function handleDeleteSuccess(data) {
    await firebaseConnection.database().ref("historico")
      .child(uid).child(data.key).remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === "despesa" ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

        await firebaseConnection.database().ref("users").child(uid)
          .child("saldo").set(saldoAtual);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  function handleShowPicker() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === "ios");
    setNewDate(date);
  };

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2).replace(regex, "$1.")}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" color="#fff" size={30} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
      />

      {show && (
        <DatePicker
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
      )}

    </Background>
  );
}
