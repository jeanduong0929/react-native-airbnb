import React from "react";
import Colors from "@/constants/Colors";
import { AntDesign, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabs = [
  {
    name: "index",
    label: "Explorer",
    icon: ({ color, size }: { color: string; size: number }) => (
      <AntDesign name="search1" size={size} color={color} />
    ),
  },
  {
    name: "wishlists",
    label: "Wishlists",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="heart-outline" size={size} color={color} />
    ),
  },
  {
    name: "trips",
    label: "Trips",
    icon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesome5 name="airbnb" size={size} color={color} />
    ),
  },
  {
    name: "inbox",
    label: "Inbox",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="chatbubble-outline" size={size} color={color} />
    ),
  },
  {
    name: "profile",
    label: "Profile",
    icon: ({ color, size }: { color: string; size: number }) => (
      <Ionicons name="person-outline" size={size} color={color} />
    ),
  },
];

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => tab.icon?.({ color, size }),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
