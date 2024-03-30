import React from "react";
import Colors from "@/constants/Colors";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Haptic from "expo-haptics";

const tabs = [
  {
    title: "",
  },
  {
    title: "Beachfront",
    icon: ({ index, activeIndex }: { index: number; activeIndex: number }) => (
      <FontAwesome5
        name="umbrella-beach"
        size={24}
        color={index === activeIndex ? "black" : "grey"}
      />
    ),
  },
  {
    title: "Cabins",
    icon: ({ index, activeIndex }: { index: number; activeIndex: number }) => (
      <MaterialCommunityIcons
        name="cabin-a-frame"
        size={24}
        color={index === activeIndex ? "black" : "grey"}
      />
    ),
  },
  {
    title: "Design",
    icon: ({ index, activeIndex }: { index: number; activeIndex: number }) => (
      <MaterialCommunityIcons
        name="home-city-outline"
        size={24}
        color={index === activeIndex ? "black" : "grey"}
      />
    ),
  },
  {
    title: "Mansions",
    icon: ({ index, activeIndex }: { index: number; activeIndex: number }) => (
      <MaterialIcons
        name="castle"
        size={24}
        color={index === activeIndex ? "black" : "grey"}
      />
    ),
  },
  {
    title: "Countryside",
    icon: ({ index, activeIndex }: { index: number; activeIndex: number }) => (
      <Foundation
        name="trees"
        size={24}
        color={index === activeIndex ? "black" : "grey"}
      />
    ),
  },
  {
    title: "Trending",
    icon: ({ index, activeIndex }: { index: number; activeIndex: number }) => (
      <FontAwesome6
        name="fire"
        size={24}
        color={index === activeIndex ? "black" : "grey"}
      />
    ),
  },
  {
    title: "",
  },
];

const ExplorerHeader = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const viewRef = React.useRef<Array<View | null>>([]);
  const scrollRef = React.useRef<ScrollView>(null);
  const tabsMemo = React.useMemo(() => tabs, []);

  /**
   * Handles the scroll event for the header component.
   *
   * @param index - The index of the item being scrolled to.
   */
  const handleScroll = (index: number) => {
    setActiveIndex(index);
    const currentView = viewRef.current[index];

    currentView?.measure((x, y) => {
      scrollRef.current?.scrollTo({ x: x - 50, animated: true });
    });

    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity style={styles.search}>
            <Ionicons name="search" size={24} color="black" />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                Where to?
              </Text>
              <Text style={{ color: Colors.grey, fontSize: 14 }}>
                Anywhere * Any week * Add guests
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="options" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          <View style={styles.headerContainer}>
            {tabsMemo.map((tab, index) => (
              <View ref={(ref) => (viewRef.current[index] = ref)} key={index}>
                <TouchableOpacity
                  style={[
                    styles.header,
                    index === activeIndex && {
                      borderBottomColor: "black",
                      borderBottomWidth: 2,
                    },
                  ]}
                  onPress={() => handleScroll(index)}
                >
                  {tab.icon && tab.icon({ index, activeIndex })}
                  <Text
                    style={{
                      fontSize: 12,
                      color: index === activeIndex ? "black" : Colors.grey,
                    }}
                  >
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    width: 320,

    backgroundColor: "white",
    borderColor: "gainsboro",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  header: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
});

export default ExplorerHeader;
