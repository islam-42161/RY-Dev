import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { IconButton, useTheme,Colors, MD3Colors } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../AuthProvider";
import Animated, {
  FadeOut,
  LightSpeedOutRight,
  SlideOutRight,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Directions,
  Gesture,
  GestureDetector,
  Swipeable,
} from "react-native-gesture-handler";
import Header from "../components/Header";

// StatusBar.setHidden(true)
const AnimatedNotificationItem = Animated.createAnimatedComponent(Pressable);

// const  {height,width} = Dimensions.get('screen')
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const Notifications = ({ navigation, route }) => {
  const { notifications, setNotifications } = useContext(AuthContext);
  const theme = useTheme();
  const [value, setValue] = React.useState("all");
  useEffect(() => {
    setNotifications([
      {
        title: "Welcome to our Life Coaching Organization!",
        message:
          "We're excited to have you on board and look forward to helping you achieve your personal and professional goals.",
      },
      {
        title: "Life Coaching Session Reminder",
        message:
          "Just a friendly reminder that you have a life coaching session scheduled for tomorrow. We look forward to seeing you!",
      },
      {
        title: "Congratulations on Your Achievement!",
        message:
          "We're thrilled to see you making progress towards your goals. Keep up the great work!",
      },
      {
        title: "Motivational Message",
        message:
          "Remember, the key to success is consistency. Keep pushing, you're doing great!",
      },
    ]);
  }, []);

  function deleteNotification(index) {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter((item, i) => i !== index);
    });
  }
  const SwipeableRow = ({ item, index }) => {
  const renderRightActions = () => (
    <IconButton icon={'delete'} mode="contained" onPress={()=>deleteNotification(index)} iconColor={MD3Colors.error60} containerColor={MD3Colors.error90} style={{alignSelf:'center',marginEnd:20}}/>
  );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <AnimatedNotificationItem
          style={[
            styles.notification_item,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Text
              style={[theme.fonts.titleMedium, { flex: 1 }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {/* <Ionicons
              name="close-outline"
              onPress={() => deleteNotification(index)}
              size={theme.fonts.titleMedium.fontSize}
              style={{ margin: 2.5 }}
            /> */}
            {/* <IconButton icon={'close'} mode="contained" size={theme.fonts.bodyMedium.fontSize}/> */}
          </View>
          {/* <View style={{height:StyleSheet.hairlineWidth,backgroundColor:'black'}}/> */}
          <Text style={[theme.fonts.bodyMedium]}>{item.message}</Text>
        </AnimatedNotificationItem>
      </Swipeable>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <View style={styles.container}>
        <Header title={"Notifications"}/>
        {/* <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={{ marginHorizontal: 20 }}
          buttons={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "facebook",
              label: "Facebook",
              icon: "facebook",
            },
            {
              value: "youtube",
              label: "Youtube",
              icon: "youtube",
            },
            {
              value: "linkedin",
              label: "LinkedIn",
              icon: "linkedin",
            },
          ]}
        /> */}

        {/* notifications */}
        <FlatList
          data={notifications}
          contentContainerStyle={styles.notifications}
          renderItem={({ item, index }) => (
            <SwipeableRow index={index} item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default Notifications;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT * 1.5,
  },
  container: {
    flex: 1,
    gap: 10,
  },
  notifications: {
    gap: 20,
    // marginHorizontal: 20,
    paddingBottom: "10%",
  },
  notification_item: {
    // paddingHorizontal:10*1.2,
    // paddingVertical:10,
    padding: 10,
    borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    gap: 5,
    marginHorizontal: 20,
  },
});
