import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RootLayout = () => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "",
        }}
      />

      <Stack.Screen
        name="(modals)/login"
        options={{
          title: "Log in or sign up",
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayout;
