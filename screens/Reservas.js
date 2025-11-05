import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservas';

const Reservas = ({ route }) => {
  const { sala, usuario } = route.params;
  const [reservas, setReservas] = useState([]);
  const [dataHoraInicio, setDataHoraInicio] = useState('');
  const [dataHoraFim, setDataHoraFim] = useState('');

  const fetchReservas = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuario/${usuario.id}`);
      setReservas(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar reservas.');
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleReserva = async () => {
    try {
      await axios.post(API_URL, {
        sala,
        usuario,
        dataHoraInicio,
        dataHoraFim,
      });
      fetchReservas();
    } catch (error) {
      console.error(error);
      alert('Erro ao criar reserva.');
    }
  };

  const handleCancelamento = async (reservaId) => {
    try {
      await axios.delete(`${API_URL}/${reservaId}`);
      fetchReservas();
    } catch (error) {
      console.error(error);
      alert('Erro ao cancelar reserva.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.dataHoraInicio} - {item.dataHoraFim}
      </Text>
      {usuario.id === item.usuario.id && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelamento(item.id)}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas para a sala {sala.nome}</Text>
      <TextInput
        style={styles.input}
        placeholder="Data e Hora de Início (YYYY-MM-DDTHH:MM:SS)"
        value={dataHoraInicio}
        onChangeText={setDataHoraInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Data e Hora de Fim (YYYY-MM-DDTHH:MM:SS)"
        value={dataHoraFim}
        onChangeText={setDataHoraFim}
      />
      <Button title="Reservar" onPress={handleReserva} />
      <FlatList
        data={reservas.filter((reserva) => reserva.sala.id === sala.id)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
  },
});

export default Reservas;
