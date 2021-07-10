import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";

const Stack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                <Stack.Screen name='Cadastro' component={Cadastro}/>

                <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
