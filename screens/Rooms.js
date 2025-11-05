import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Rooms = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = await getDocs(collection(db, 'rooms'));
      setRooms(roomsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchRooms();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Bookings', { roomId: item.id })}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
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

export default Rooms;
