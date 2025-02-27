import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { store } from "./store";
import Dashboard from "./Dashboard";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import UpdateTransaction from "./UpdateTransaction";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Dashboard") {
          iconName = "dashboard";
        } else if (route.name === "All Transactions") {
          iconName = "list";
        } else if (route.name === "Add Transaction") {
          iconName = "plus-circle";
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#34c3eb",
      tabBarInactiveTintColor: "#ffffff",
      tabBarStyle: {
        backgroundColor: "#000000",
      },
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTintColor: "#ffffff",
    })}
  >
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Transaction List" component={TransactionList} />
    <Tab.Screen name="ADD Transaction" component={AddTransaction} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        theme={{
          colors: {
            background: "#000000",
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerTintColor: "#ffffff",
          }}
        >
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Update Transaction"
            component={UpdateTransaction}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
