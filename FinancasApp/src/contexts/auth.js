import React, { createContext, useEffect, useState } from "react";
import firebaseConnection from "../services/firebaseConnection";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

LogBox.ignoreAllLogs();

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("Auth_user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    await firebaseConnection.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebaseConnection.database().ref("users").child(uid).once("value")
          .then((snapshot) => {
            let data = {
              uid: uid,
              name: snapshot.val().name,
              email: value.user.email,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          });
      })
      .catch((error) => {
        alert(error.code);
        setLoadingAuth(false);
      });
  }

  async function signUp(nome, email, password) {
    setLoadingAuth(true);
    await firebaseConnection.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebaseConnection.database().ref("users").child(uid).set({
          saldo: 0,
          name: nome,
        })
          .then(() => {
            let data = {
              uid: uid,
              name: nome,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          });
      })
      .catch((error) => {
        alert(error.code);
        setLoadingAuth(false);
      });
  }

  async function storageUser(data) {
    await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
  }

  async function signOut() {
    await firebaseConnection.auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      });
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loading, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
