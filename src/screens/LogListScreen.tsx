import { Colors } from "@/src/constants";
import { RootState } from "@/src/store";
import { FarmingLog } from "@/src/types/log";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const LogListScreen = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const logs = useSelector((state: RootState) => state.logs.logs);

  const renderItem = ({ item }: { item: FarmingLog }) => (
    <View style={styles.logItem}>
      <View style={styles.logInfo}>
        <Text style={styles.activityName}>{item.activityName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.syncBadge,
            {
              backgroundColor:
                item.syncStatus === "synced" ? Colors.synced : Colors.pending,
            },
          ]}
        >
          <Text style={styles.syncText}>{item.syncStatus.toUpperCase()}</Text>
        </View>
        <Text style={styles.statusText}>
          {t(`status.${item.status.toLowerCase()}`)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.langToggle}
        onPress={() =>
          i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
        }
      >
        <Text style={styles.langText}>{i18n.language.toUpperCase()}</Text>
      </TouchableOpacity>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t("log.empty")}</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEditLog")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  logItem: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  logInfo: { flex: 1 },
  activityName: { fontSize: 18, fontWeight: "bold", color: Colors.text },
  date: { fontSize: 14, color: "#757575", marginTop: 4 },
  statusContainer: { alignItems: "flex-end" },
  syncBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  syncText: { fontSize: 10, color: Colors.white, fontWeight: "bold" },
  statusText: { fontSize: 12, fontWeight: "600" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: Colors.white, fontSize: 24 },
  langToggle: { alignSelf: "flex-end", padding: 10, marginRight: 10 },
  langText: { fontWeight: "bold", color: Colors.primary },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});

export default LogListScreen;
