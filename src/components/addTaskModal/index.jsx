import { TouchableWithoutFeedback, TextInput, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import CustomModal from "../customModal";
import { styles } from "./styles";

const AddTaskModal = ({
  open,
  handleChangeTitle,
  handleChangeDesc,
  task,
  handleCancel,
  handleAddTask,
  dropdownOpen,
  dropdownValue,
  items,
  setIsDropdownOpen,
  setDropdownValue,
  setItems,
}) => {
  return (
    <CustomModal open={open}>
      <Text style={styles.modalHeading}>Agregar Tarea</Text>

      <View style={styles.modalForm}>
        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Título</Text>
          <TextInput
            onChangeText={handleChangeTitle}
            value={task.title}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Descripción</Text>
          <TextInput
            onChangeText={handleChangeDesc}
            value={task.description}
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

          <TouchableWithoutFeedback onPress={handleAddTask}>
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

export default AddTaskModal;
