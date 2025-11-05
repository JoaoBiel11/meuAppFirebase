import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/salas';

const Salas = ({ route, navigation }) => {
  const { usuario } = route.params;
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get(API_URL);
        setSalas(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar salas.');
      }
    };

    fetchSalas();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Reservas', { sala: item, usuario })}
    >
      <Text style={styles.itemText}>{item.nome} (Capacidade: {item.capacidade})</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {usuario.nome}!</Text>
      <FlatList
        data={salas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemText: {
    fontSize: 18,
  },
});

export default Salas;
