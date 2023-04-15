import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import ListaFake from "../../Services/ListaFake";

const Item = ({ name, email }) => (
  <View style={styles.item}>
    <Text style={styles.nameTXT}>{name}</Text>
    <Text style={styles.emailTXT}>{email}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => <Item name={item.name} email={item.email} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={ListaFake}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    width: "100%",
    padding: 16,
  },
  item: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nameTXT: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  emailTXT: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
  },
});

export default App;
