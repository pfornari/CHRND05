import React, { useState, useRef } from "react";
import { Alert, View } from "react-native";
import uuid from "react-native-uuid";

import { useSelector, useDispatch } from "react-redux";
import {
  addReminder,
  toggleNotifications,
  editReminder,
  removeReminder,
} from "../../store/actions/reminders.actions";

import { useDateTimePicker } from "../../hooks";
import {
  Header,
  AddItemButton,
  AddReminderModal,
  RemindersList,
  EditReminderModal,
} from "../../components";
import { styles } from "./styles";

const RemindersScreen = () => {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.items);

  const [reminder, setReminder] = useState({
    id: "",
    title: "",
    description: "",
    time: new Date(),
    notifications: true,
  });
  const [reminderToEdit, setReminderToEdit] = useState(null);

  const triggerEditReminder = (reminder) => {
    setReminderToEdit(reminder);
    setEditModalVisible(true);
  };

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { time, handleChangeTime } = useDateTimePicker();

  const handleChangeTitle = (value) =>
    setReminder({ ...reminder, title: value });
  const handleChangeDesc = (value) =>
    setReminder({ ...reminder, description: value });

  const handleCancelAdd = () => {
    setAddModalVisible(false);
    setReminder({
      id: "",
      title: "",
      description: "",
      time: new Date(),
      notifications: true,
    });
  };
  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setReminderToEdit(null);
  };

  const handleAddReminder = () => {
    if (reminder.title === "" || reminder.description === "") {
      Alert.alert(
        "Por favor, completar todos los campos",
        "Title, description y time son requeridos para crear un recordatorio",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    dispatch(
      addReminder({ ...reminder, time, notifications: true, id: uuid.v4() })
    );

    setAddModalVisible(false);
    setReminder({
      id: "",
      title: "",
      description: "",
      time: "",
      notifications: true,
    });

    if (reminder.length > 1) flatListRef.current.scrollToEnd();
  };

  const handleNotifications = (id) => {
    dispatch(toggleNotifications(id));
  };
  const handleEdit = (id, data) => {
    dispatch(editReminder(id, data));
    setEditModalVisible(false);
  };
  const handleDelete = (id) => {
    return Alert.alert(
      "Eliminar recordatorio",
      "¿Está seguro que desea eliminar el recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteReminder(id),
        },
      ]
    );
  };
  const deleteReminder = (id) => {
    dispatch(removeReminder(id));
  };

  const flatListRef = useRef();

  return (
    <View style={styles.container}>
      <Header title="Recordatorios" subtitle="Agregar o borrar Recordatorios" />

      <RemindersList
        reminders={reminders}
        flatListRef={flatListRef}
        triggerEditReminder={triggerEditReminder}
        handleDelete={handleDelete}
        handleNotifications={handleNotifications}
      />

      <AddItemButton
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
      />

      <AddReminderModal
        open={addModalVisible}
        reminder={reminder}
        time={time}
        handleChangeTitle={handleChangeTitle}
        handleChangeDesc={handleChangeDesc}
        handleChangeTime={handleChangeTime}
        handleCancel={handleCancelAdd}
        handleAddReminder={handleAddReminder}
      />

      <EditReminderModal
        open={editModalVisible}
        reminder={reminderToEdit}
        handleCancel={handleCancelEdit}
        handleEdit={handleEdit}
      />
    </View>
  );
};

export default RemindersScreen;
