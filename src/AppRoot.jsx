import { Alert, PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuthProvider from "../AuthProvider";
import RootNavigator from "../RootNavigator";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";

const AppRoot = () => {
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  };

  useEffect(() => {
    requestPermission();
    messaging().getToken().then(token=>{
      console.log(token)
    })
    // when app is in quit mode
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused to open the app in quit state: ",
            remoteMessage.notification
          );
        }
      });

    // when app is running in the background
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state: ",
        remoteMessage.notification
      );
    });

    // register background notification handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background: ", remoteMessage);
    });



    const unsubscribe = messaging().onMessage(async (remoteMessage)=>{
      console.log("Notification Arrived: ",JSON.stringify(remoteMessage));
    })
    return unsubscribe;


  }, []);




  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState([
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
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthProvider
      notifications={notifications}
      setNotifications={setNotifications}
      user={user}
      setUser={setUser}
      profileModalVisible={profileModalVisible}
      setProfileModalVisible={setProfileModalVisible}
    >
      <RootNavigator />
    </AuthProvider>
  );
};

export default AppRoot;

const styles = StyleSheet.create({});
