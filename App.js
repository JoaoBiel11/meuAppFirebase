import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Salas from './screens/Salas';
import Reservas from './screens/Reservas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Salas" component={Salas} options={{ title: 'Salas Disponíveis' }} />
        <Stack.Screen name="Reservas" component={Reservas} options={{ title: 'Minhas Reservas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
