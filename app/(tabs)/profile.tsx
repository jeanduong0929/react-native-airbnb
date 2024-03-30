import React from "react";
import { View, Button, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const ProfileTab = () => {
  const { isLoaded, isSignedIn, signOut } = useAuth();

  const handleSignOut = () => {
    if (isLoaded && isSignedIn) {
      signOut();
    }
  };

  return (
    <View>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

export default ProfileTab;
