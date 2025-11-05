import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, addDoc, where, query, deleteDoc, doc } from 'firebase/firestore';

const Bookings = ({ route }) => {
  const { roomId } = route.params;
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const user = auth.currentUser;

  const fetchBookings = async () => {
    const q = query(collection(db, 'bookings'), where('roomId', '==', roomId));
    const bookingsCollection = await getDocs(q);
    setBookings(
      bookingsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    fetchBookings();
  }, [roomId]);

  const handleBooking = async () => {
    // Check for duplicate bookings
    const q = query(
      collection(db, 'bookings'),
      where('roomId', '==', roomId),
      where('date', '==', date),
      where('time', '==', time)
    );
    const existingBookings = await getDocs(q);

    if (existingBookings.empty) {
      await addDoc(collection(db, 'bookings'), {
        roomId,
        date,
        time,
        userId: user.uid,
      });
      fetchBookings(); // Refresh bookings
    } else {
      alert('This time slot is already booked.');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    await deleteDoc(doc(db, 'bookings', bookingId));
    fetchBookings(); // Refresh bookings
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.date} at {item.time} by {item.userId}
      </Text>
      {user && user.uid === item.userId && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelBooking(item.id)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Book" onPress={handleBooking} />
      <FlatList
        data={bookings}
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

export default Bookings;
