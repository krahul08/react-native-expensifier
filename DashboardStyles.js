import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#2196f3",
  },
  headerCell: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffffff",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  amountText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
  },
  actionCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 5,
    margin: 16,
    elevation: 3,
  },
  downloadText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#ffffff",
  },
});

export default styles;
