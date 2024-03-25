import { View } from "react-native";
import { Link } from "expo-router";
import React from "react";

const ExplorerTab = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/bookings"}>Bookings</Link>
    </View>
  );
};

export default ExplorerTab;
