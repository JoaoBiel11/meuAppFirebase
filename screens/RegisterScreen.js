import { useState } from "react";

import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuário cadastrado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
