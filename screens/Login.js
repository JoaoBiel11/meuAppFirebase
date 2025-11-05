import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      if (response.data) {
        navigation.navigate('Salas', { usuario: response.data });
      } else {
        alert('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer login.');
    }
  };

  const handleRegistro = async () => {
    try {
      const response = await axios.post(`${API_URL}/registrar`, { email, senha, nome: 'Novo Usuário' });
      if (response.data) {
        navigation.navigate('Salas', { usuario: response.data });
      } else {
        alert('Erro ao registrar.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrar" onPress={handleRegistro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
});

export default Login;
