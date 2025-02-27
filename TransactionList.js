import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "./transactionsSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./DashboardStyles";

const TransactionList = ({ navigation }) => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" },
      ]}
    >
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.description}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.cell}>
        <Text
          style={[
            styles.cellText,
            { color: item.type === "Income" ? "#4caf50" : "#f44336" },
          ]}
        >
          {item.type}
        </Text>
      </View>
      <View style={styles.actionCell}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Update Transaction", { ...item })}
        >
          <Icon name="pencil" size={24} color="#7ba1ed" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash" size={24} color="#fa525b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Description</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Amount</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Type</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Action</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default TransactionList;
