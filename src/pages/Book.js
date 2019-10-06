import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  AsyncStorage
} from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
  const id = navigation.getParam("id");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");

    console.log(`/spots/${id}/bookings`);

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: {
          user_id
        }
      }
    );

    Alert.alert("Solciitação de reserva enviada");

    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar Reseva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    margin: 30
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center"
  },

  content: {
    marginBottom: 15,
    marginTop: 5
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 15
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
