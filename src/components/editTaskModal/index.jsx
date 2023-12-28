import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomModal from "../customModal";
import { useDropdown } from "../../hooks";
import { styles } from "./styles";

const dropdownItems = [
  { label: "Crítico", value: "critical" },
  { label: "Alto", value: "high" },
  { label: "Medio", value: "medium" },
  { label: "Bajo", value: "low" },
];

const EditTaskModal = ({ open, task, handleCancel, handleEdit }) => {
  const [newTask, setNewTask] = useState(task);

  const {
    dropdownOpen,
    setIsDropdownOpen,
    dropdownValue,
    setDropdownValue,
    items,
    setItems,
  } = useDropdown(dropdownItems);

  const handleChangeTitle = (value) => setNewTask({ ...newTask, title: value });
  const handleChangeDesc = (value) =>
    setNewTask({ ...newTask, description: value });

  useEffect(() => {
    setNewTask(task);
    setDropdownValue(task?.priority);
  }, [task]);

  const handleEditTask = () => {
    if (
      newTask?.title === "" ||
      newTask?.description === "" ||
      dropdownValue === null
    ) {
      Alert.alert(
        "Por favor, completar todos los campos",
        "Title, description y time son requeridos para crear un recordatorio",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    handleEdit(newTask.id, { ...newTask, priority: dropdownValue });
  };

  return (
    <CustomModal open={open}>
      <Text style={styles.modalHeading}>Editar Tarea</Text>

      <View style={styles.modalForm}>
        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Título</Text>
          <TextInput
            onChangeText={handleChangeTitle}
            value={newTask?.title}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Descripción</Text>
          <TextInput
            onChangeText={handleChangeDesc}
            value={newTask?.description}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Prioridad</Text>
          <DropDownPicker
            open={dropdownOpen}
            value={dropdownValue}
            items={items}
            setOpen={setIsDropdownOpen}
            setValue={setDropdownValue}
            setItems={setItems}
            placeholder="Seleccione una prioridad"
            style={styles.modalFormInput}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholderStyle={styles.dropdownPlaceholder}
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

          <TouchableWithoutFeedback onPress={handleEditTask}>
            <View
              style={[
                styles.modalFormAction,
                styles.primaryButton,
                { marginLeft: 6 },
              ]}
            >
              <Text style={styles.modalFormActionText}>Guardar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </CustomModal>
  );
};

export default EditTaskModal;
