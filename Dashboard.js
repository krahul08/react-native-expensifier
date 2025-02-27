import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addTransaction, editRecurringTransaction } from "./transactionsSlice";

const Dashboard = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const categories = useSelector((state) => state.transactions.category);
  const costList = useSelector(
    (state) => state.transactions.recurringTransactions
  );
  const dispatch = useDispatch();

  function generateColor(index) {
    const hue = (index * 137.5) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }

  const checkAndAddTransaction = () => {
    costList.forEach((cost) => {
      if (moment().format("DD-MM-YYYY") === cost.nextdate) {
        const newTransaction = {
          description: cost.const_name,
          amount: cost.amount,
          id: Date.now().toString(),
          type: "Expense",
          date: moment().format("DD-MM-YYYY"),
          category: "recurring",
        };
        dispatch(addTransaction(newTransaction));

        const getNextDate = (duration) => {
          switch (duration) {
            case "Daily":
              return moment().add(1, "days").format("DD-MM-YYYY");
            case "Monthly":
              return moment()
                .endOf("month")
                .add(1, "months")
                .format("DD-MM-YYYY");
            case "Yearly":
              return moment()
                .endOf("year")
                .add(1, "years")
                .month(11)
                .date(31)
                .format("DD-MM-YYYY");
            default:
              return null;
          }
        };
        const newCost = {
          const_name: cost.const_name,
          amount: cost.amount,
          duration: cost.duration,
          id: cost.id,
          next: getNextDate(cost.duration),
        };
        dispatch(editRecurringTransaction(newCost));
      }
    });
  };

  useEffect(() => {
    checkAndAddTransaction();
  }, []);

  const totalIncome = transactions
    .filter((tx) => tx.type === "Income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "Expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpenses;

  const graphData = [
    {
      name: "Income",
      cost: totalIncome,
      color: "#4CAF50", // Green
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Expense",
      cost: totalExpenses,
      color: "#F44336", // Red
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dataByDay = {
    Income: Array(7).fill(0),
    Expense: Array(7).fill(0),
  };

  transactions.forEach((transaction) => {
    const dayOfWeek = moment(transaction.date, "DD-MM-YYYY").day();
    dataByDay[transaction.type][dayOfWeek] += transaction.amount;
  });

  const lineData = {
    labels: daysOfWeek,
    datasets: [
      {
        data: dataByDay.Income,
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green
      },
      {
        data: dataByDay.Expense,
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Red
      },
    ],
    legend: ["Income", "Expenses"],
  };

  const pieCetegryData = () => {
    const data = categories.map((category, index) => {
      return {
        name: category,
        cost: transactions
          .filter((tx) => tx.category === category)
          .reduce((sum, tx) => sum + tx.amount, 0),
        color: generateColor(index),
        legendFontColor: "#212529",
        legendFontSize: 15,
      };
    });

    return data;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Total Income</Text>
          <Text style={styles.amount}>${totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Total Expenses</Text>
          <Text style={styles.amount}>${totalExpenses.toFixed(2)}</Text>
        </View>
      </View>
      <View
        style={[
          styles.balanceBox,
          { backgroundColor: balance < 0 ? "#F44336" : "#4CAF50" },
        ]}
      >
        <Text style={styles.balanceText}>Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>

      <View style={styles.graphView}>
        <Text style={styles.graphHeader}>Overview</Text>
        <PieChart
          data={graphData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          accessor={"cost"}
          backgroundColor={"transparent"}
          paddingLeft="15"
        />
      </View>

      <View style={styles.graphView}>
        <Text style={styles.graphHeader}>Expenses by Category</Text>
        <PieChart
          data={pieCetegryData()}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          accessor={"cost"}
          backgroundColor={"transparent"}
          paddingLeft="15"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f0f4f8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4CAF50",
    marginTop: 5,
  },
  balanceBox: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
  },
  graphHeader: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  graphView: {
    backgroundColor: "#f8f9fa",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default Dashboard;
