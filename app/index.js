import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { openAuthSessionAsync } from "expo-web-browser";
import EventSource from "react-native-sse";
global.EventSource = EventSource;

import PocketBase from "pocketbase";
const pb = new PocketBase("");

export default function Page() {
  const handleLogin = async () => {
    const authData = await pb.collection("users").authWithOAuth2({
      provider: "google",
      urlCallback: async (url) => {
        await openAuthSessionAsync(url);
      },
    });

    console.log(authData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Pocketbase RN OAuth</Text>
        <Button title="Continue with Google" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
