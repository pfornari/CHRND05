import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TodoScreen, RemindersScreen, SettingsScreen } from "../screens";
import { colors, fonts } from "../theme";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Tareas" screenOptions={screenOptions}>
      <Tab.Screen name="Tareas" component={TodoScreen} />
      <Tab.Screen name="Recordatorios" component={RemindersScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    switch (route.name) {
      case "Tareas":
        return (
          <Image
            style={[
              styles.buttonIcon,
              focused && { tintColor: colors.primary },
            ]}
            source={require("../assets/todos.png")}
          />
        );

      case "Recordatorios":
        return (
          <Image
            style={[
              styles.buttonIcon,
              focused && { tintColor: colors.primary },
            ]}
            source={require("../assets/reminders.png")}
          />
        );

      case "Configuración":
        return (
          <Image
            style={[
              styles.buttonIcon,
              focused && { tintColor: colors.primary },
            ]}
            source={require("../assets/settings.png")}
          />
        );

      default:
        break;
    }
  },
  tabBarStyle: styles.tabBar,
  tabBarItemStyle: styles.tabBarItem,
  tabBarLabelStyle: styles.tabBarLabel,
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textLight,
});

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundLight,
    height: 68,
    borderTopWidth: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 5,
  },
  tabBarItem: {
    marginVertical: 10,
  },
  tabBarLabel: {
    fontFamily: fonts.medium,
    fontSize: fonts.xxs,
  },
  buttonIcon: {
    tintColor: colors.textLight,
    width: 32,
    height: 32,
  },
});

export default TabsNavigator;
