import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const LoginModal = () => {
  const router = useRouter();

  /**
   * Initiates the OAuth flow for Google authentication.
   *
   * @remarks
   * This function is used to start the OAuth flow for Google authentication.
   *
   * @returns A function that can be called to start the OAuth flow.
   */
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });

  /**
   * Handles the Google authentication process.
   */
  const handleGoogleAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
        });
        router.back();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnContainer} onPress={handleGoogleAuth}>
        <AntDesign
          style={styles.btnIcon}
          name="google"
          size={24}
          color="black"
        />
        <Text style={{ fontSize: 16 }}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    width: "100%",
  },
  btnIcon: {
    position: "absolute",
    left: 20,
  },
});

export default LoginModal;
