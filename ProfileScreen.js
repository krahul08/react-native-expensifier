import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("Rahul Buraday");
  const [newContact, setNewContact] = useState("+1234567890");

  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

  const handleSaveChanges = () => {
    setModalVisible(false);
  };

  return (
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <View style={styles.header}>
        <Image source={{ uri: "" }} style={styles.profileImage} />
        <Text style={isDarkMode ? styles.usernameDark : styles.usernameLight}>
          {newUsername}
        </Text>
        <Text style={isDarkMode ? styles.contactDark : styles.contactLight}>
          Contact No: {newContact}
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text
          style={isDarkMode ? styles.switchLabelDark : styles.switchLabelLight}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#ccc", true: "#4CAF50" }}
          thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.textInput}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="Enter new username"
            />
            <TextInput
              style={styles.textInput}
              value={newContact}
              onChangeText={setNewContact}
              placeholder="Enter new contact number"
              keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.customButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.customButton, styles.saveButton]}
                onPress={handleSaveChanges}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    padding: 20,
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  usernameLight: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  usernameDark: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  contactLight: {
    fontSize: 16,
    color: "#7F7F7F",
  },
  contactDark: {
    fontSize: 16,
    color: "#B0BEC5",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchLabelLight: {
    color: "#333",
    marginRight: 10,
  },
  switchLabelDark: {
    color: "#ffffff",
    marginRight: 10,
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  customButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: "45%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#fa525b",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
