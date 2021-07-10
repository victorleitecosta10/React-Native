import React from 'react'
import Routes from "./src/routes";
import {LogBox} from "react-native";

LogBox.ignoreAllLogs()

export default function App() {
    return (
        <Routes/>
    )
}
