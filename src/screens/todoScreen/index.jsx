import React, { useState, useRef } from "react";
import { View, Alert } from "react-native";
import uuid from "react-native-uuid";

import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  toggleDone,
  editTask,
  removeTask,
} from "../../store/actions/tasks.actions";

import {
  AddTaskModal,
  Header,
  AddItemButton,
  TasksList,
  EditTaskModal,
} from "../../components";
import { useDropdown } from "../../hooks";
import { styles } from "./styles";

const dropdownItems = [
  { label: "Crítico", value: "critical" },
  { label: "Alto", value: "high" },
  { label: "Medio", value: "medium" },
  { label: "Bajo", value: "low" },
];

const TodoScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);

  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    done: false,
  });
  const [taskToEdit, setTaskToEdit] = useState(null);

  const triggerEditTask = (task) => {
    setTaskToEdit(task);
    setEditModalVisible(true);
  };

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const {
    dropdownOpen,
    setIsDropdownOpen,
    dropdownValue,
    setDropdownValue,
    items,
    setItems,
  } = useDropdown(dropdownItems);

  const handleChangeTitle = (value) => setTask({ ...task, title: value });
  const handleChangeDesc = (value) => setTask({ ...task, description: value });

  const handleCancelAdd = () => {
    setAddModalVisible(false);
    setTask({
      id: "",
      title: "",
      description: "",
      priority: "",
      done: false,
    });
    setDropdownValue(null);
  };
  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setTaskToEdit(null);
  };

  const handleAddTask = () => {
    if (
      task.title === "" ||
      task.description === "" ||
      dropdownValue === null
    ) {
      Alert.alert(
        "Por favor, completar todos los campos",
        "Title, description y time son requeridos para crear un recordatorio",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    dispatch(addTask({ ...task, priority: dropdownValue, id: uuid.v4() }));

    setAddModalVisible(false);
    setTask({
      id: "",
      title: "",
      description: "",
      priority: "",
      done: false,
    });
    setDropdownValue(null);

    if (tasks.length > 1) flatListRef.current.scrollToEnd();
  };

  const handleCheck = (id) => {
    dispatch(toggleDone(id));
  };
  const handleEdit = (id, data) => {
    dispatch(editTask(id, data));
    setEditModalVisible(false);
  };
  const handleDelete = (id) => {
    return Alert.alert(
      "Eliminar tarea",
      "¿Estás seguro que desea eliminar esta tarea?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteTask(id),
        },
      ]
    );
  };
  const deleteTask = (id) => {
    dispatch(removeTask(id));
  };

  const flatListRef = useRef();

  return (
    <>
      <View style={styles.container}>
        <Header
          title="Lista de Tareas"
          subtitle="Agregar, eliminar o marcar como realizada una tarea"
        />

        <TasksList
          tasks={tasks}
          flatListRef={flatListRef}
          triggerEditTask={triggerEditTask}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />

        <AddItemButton
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
        />

        <AddTaskModal
          open={addModalVisible}
          handleChangeTitle={handleChangeTitle}
          handleChangeDesc={handleChangeDesc}
          task={task}
          dropdownOpen={dropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
          items={items}
          setItems={setItems}
          handleCancel={handleCancelAdd}
          handleAddTask={handleAddTask}
        />

        <EditTaskModal
          open={editModalVisible}
          task={taskToEdit}
          handleCancel={handleCancelEdit}
          handleEdit={handleEdit}
        />
      </View>
    </>
  );
};

export default TodoScreen;
