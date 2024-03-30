import React from "react";
import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";

const tabs = [
  {
    name: "index",
    title: "Explorer",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name={"search"} size={size} color={color} />
    ),
  },
  {
    name: "wishlist",
    title: "Wishlist",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name={"heart-outline"} size={size} color={color} />
    ),
  },
  {
    name: "trips",
    title: "Trips",
    icon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesome5 name={"airbnb"} size={size} color={color} />
    ),
  },
  {
    name: "inbox",
    title: "Inbox",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name={"chatbox-ellipses-outline"} size={size} color={color} />
    ),
  },
  {
    name: "profile",
    title: "Profile",
    icon: ({ color, size }: { color: string; size: number }) => (
      <SimpleLineIcons name="user" size={size} color={color} />
    ),
  },
];

export default function TabLayout() {
  /**
   * Memoizes the `tabs` array using React's `useMemo` hook.
   * This is done to prevent the `tabs` array from being recreated on every render.
   *
   * @returns {Array} The memoized `tabs` array.
   */
  const tabsMemo = React.useMemo(() => tabs, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      {tabsMemo.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            tabBarLabel: tab.title,
            title: tab.title,
            tabBarIcon: tab.icon,
          }}
        />
      ))}
    </Tabs>
  );
}
