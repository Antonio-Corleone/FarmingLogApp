import { Colors } from "@/src/constants";
import { addLogRequest } from "@/src/store/slices/logSlides";
import { FarmingLog } from "@/src/types/log";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const AddEditLogScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // State cho Form [cite: 6]
  const [activityName, setActivityName] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"Pending" | "Completed">("Pending");

  const handleSave = () => {
    if (!activityName.trim()) return alert(t("error.required"));

    const newLog: FarmingLog = {
      id: uuidv4(),
      activityName,
      date: new Date().toLocaleDateString(),
      notes,
      status,
      syncStatus: "pending",
      createdAt: Date.now(),
    };

    dispatch(addLogRequest(newLog));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>{t("log.activityName")}</Text>
        <TextInput
          style={styles.input}
          value={activityName}
          onChangeText={setActivityName}
          placeholder="e.g. Harvesting"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{t("log.status")}</Text>
        <View style={styles.statusRow}>
          {["Pending", "Completed"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.statusBtn, status === s && styles.statusBtnActive]}
              onPress={() => setStatus(s as any)}
            >
              <Text
                style={[
                  styles.statusBtnText,
                  status === s && styles.statusBtnTextActive,
                ]}
              >
                {t(`status.${s.toLowerCase()}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{t("log.notes")}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>{t("common.save")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.white },
  formGroup: { marginBottom: 20 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  statusRow: { flexDirection: "row", gap: 10 },
  statusBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  statusBtnActive: { backgroundColor: Colors.primary },
  statusBtnText: { color: Colors.primary, fontWeight: "bold" },
  statusBtnTextActive: { color: Colors.white },
  saveBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: { color: Colors.white, fontSize: 18, fontWeight: "bold" },
});

export default AddEditLogScreen;
