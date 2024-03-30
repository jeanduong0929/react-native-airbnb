import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ClerkProvider } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  /**
   * A token cache object that provides methods for getting and saving tokens.
   */
  const tokenCache = {
    /**
     * Retrieves a token from the cache.
     * @param key - The key associated with the token.
     * @returns A Promise that resolves to the token value, or null if the token is not found or an error occurs.
     */
    async getToken(key: string) {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error: any) {
        console.error(error);
        return null;
      }
    },

    /**
     * Saves a token to the cache.
     * @param key - The key associated with the token.
     * @param value - The value of the token to be saved.
     * @returns A Promise that resolves when the token is successfully saved, or throws an error if saving fails.
     */
    async saveToken(key: string, value: string) {
      try {
        return await SecureStore.setItemAsync(key, value);
      } catch (error: any) {
        console.error(error);
      }
    },
  };

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      tokenCache={tokenCache}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name={"(modals)/login"}
          options={{ headerShown: false }}
        />
      </Stack>
    </ClerkProvider>
  );
}
