import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ReportActions from "./Component/ReportActions";
import { AuthContext } from "../../Context/ContextMethods";


const ReportScreen= () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { GetAllStudents, students, isLoading } = useContext(AuthContext);
  const [list, setList] = useState(students);
  const navigation = useNavigation();

  useEffect(() => {
    GetAllStudents();
  }, []);

  useEffect(() => {
    Search();
  }, [searchText]);

  const Search = () => {
    if (searchText === "") {
      setList(students);
    } else {
      setList(
        students.filter(
          (item) =>
            item.username.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  };
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    GetAllStudents();
    Search();
    handleOrder();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [GetAllStudents]);

  const handleOrder = () => {
    if (students && students.length > 0) {
      let newList = [...students];

      newList.sort((a, b) =>
        a.username.toLocaleLowerCase() > b.username.toLocaleLowerCase()
          ? 1
          : b.username.toLocaleLowerCase() > a.username.toLocaleLowerCase()
          ? -1
          : 0
      );

      setList(newList);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemInfo}
        onPress={() => {
          navigation.navigate("Student_Screen", {
            Cpf: item.cpf,
            username: item.username,
          });
        }}
      >
        <Text style={styles.itemUsername}>{item.username}</Text>
        <Text style={styles.itemCpf}>{item.cpf}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise uma pessoa"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />

        <Feather
          name="menu"
          style={styles.itemIcon}
          onPress={() => setIsModalVisible(!isModalVisible)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) :( <FlatList
        data={list ? list : students}
        renderItem={renderItem}
        keyExtractor={(item) => item.cpf}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>
              "Não há estudantes cadastrados."
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />)}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ReportActions handleClose={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F3F6",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#FDFDFD",
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: "black",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemUsername: {
    fontSize: 18,
    fontWeight: "600",
    color: "#262626",
    marginBottom: 5,
  },
  itemCpf: {
    fontSize: 14,
    fontWeight: "400",
    color: "#8F8F8F",
  },
  itemIcon: {
    fontSize: 50,
    color: "#4F4F4F",
    top: "7%",
    right: "5%",
  },
  listEmptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "70%",
  },
  listEmptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8F8F8F",
  },
});

export default ReportScreen;
