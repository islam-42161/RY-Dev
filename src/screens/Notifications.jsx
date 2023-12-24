import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Avatar, Card, IconButton, SegmentedButtons, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../AuthProvider";

// StatusBar.setHidden(true)

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
      }]
    );
  }, []);
  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Ionicons
            name="ios-notifications-outline"
            size={theme.fonts.displaySmall.fontSize}
            color={"black"}
          />
          <Text style={[{ fontSize: theme.fonts.displaySmall.fontSize }]}>
            Notifications
          </Text>
        </View>
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
        <ScrollView contentContainerStyle={styles.notifications}>
          {notifications.map((value, index) => {
            return (
              <Pressable key={index} style={[styles.notification_item]}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:20}}>
                <Text style={[theme.fonts.bodyLarge,{flex:1}]} numberOfLines={1}>{value.title}</Text>
                <Ionicons name="close-outline" size={theme.fonts.bodyLarge.fontSize} style={{margin:2.5}}/>
                {/* <IconButton icon={'close'} mode="contained" size={theme.fonts.bodyMedium.fontSize} iconColor={theme.colors.error} style={{backgroundColor:'#ff00001e'}}/> */}
                </View>
                <View style={{height:StyleSheet.hairlineWidth,backgroundColor:'black'}}/>
                <Text style={[theme.fonts.bodyMedium]}>
                  {value.message}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
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
    gap: 10,
    marginHorizontal: 20,
    paddingBottom:"10%"
  },
  notification_item: {
    padding: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 2.5,
  },
});
