import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../pages/HomeScreen";
import { ChartScreen } from "../pages/ChartScreen";
import { ProfileScreen } from "../pages/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export const MainTabNavigator = ({ setIsLoggedIn }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused ? "home" : "home-outline";
          } else if (route.name === "Chart") {
            icon = focused ? "pie-chart" : "pie-chart-outline";
          } else if (route.name === "Profile") {
            icon = focused ? "person" : "person-outline";
          }
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chart" component={ChartScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
