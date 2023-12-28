import React from "react";
import { View, Text, TouchableWithoutFeedback, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../theme";
import CustomModal from "../customModal";
import { styles } from "./styles";

const AddReminderModal = ({
  open,
  reminder,
  time,
  handleChangeTitle,
  handleChangeDesc,
  handleChangeTime,
  handleCancel,
  handleAddReminder,
}) => {
  return (
    <CustomModal open={open}>
      <Text style={styles.modalHeading}>Agregar Recordatorio</Text>

      <View style={styles.modalForm}>
        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Título</Text>
          <TextInput
            onChangeText={handleChangeTitle}
            value={reminder.title}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Descripción</Text>
          <TextInput
            onChangeText={handleChangeDesc}
            value={reminder.description}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Tiempo</Text>
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            onChange={handleChangeTime}
            display="spinner"
            style={styles.timePicker}
            textColor={colors.text}
          />
        </View>

        <View style={styles.modalFormActions}>
          <TouchableWithoutFeedback onPress={handleCancel}>
            <View
              style={[
                styles.modalFormAction,
                styles.secondaryButton,
                { marginRight: 6 },
              ]}
            >
              <Text
                style={[
                  styles.modalFormActionText,
                  styles.modalFormActionTextSecondary,
                ]}
              >
                Cancelar
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={handleAddReminder}>
            <View
              style={[
                styles.modalFormAction,
                styles.primaryButton,
                { marginLeft: 6 },
              ]}
            >
              <Text style={styles.modalFormActionText}>Agregar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </CustomModal>
  );
};

export default AddReminderModal;
