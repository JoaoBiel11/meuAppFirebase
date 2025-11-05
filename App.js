import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Rooms from './screens/Rooms';
import Bookings from './screens/Bookings';
import Login from './screens/Login';
import { getAuth } from 'firebase/auth';

const Stack = createStackNavigator();

export default function App() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Bookings" component={Bookings} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
