import { Alert, PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuthProvider from "../AuthProvider";
import RootNavigator from "../RootNavigator";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import { registerNewUser, uploadDeviceFCMToken } from "../firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
    // messaging().getToken().then(token=>{
    //   console.log(token)
    // })
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



    
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Notification Arrived: ", JSON.stringify(remoteMessage));

      try {
        // Retrieve notifications from AsyncStorage
        const notifications = await getNotifications();

        // Add the new notification to the array
        const updatedNotifications = [
          ...notifications,
          {
            title: remoteMessage.notification.title,
            body: remoteMessage.data.notification_body,
          },
        ];

        // Store the updated notifications in AsyncStorage
        await storeNotifications(updatedNotifications);

        // Update the state with the new notifications
        setNotifications(updatedNotifications);
      } catch (error) {
        console.error('Error storing notification:', error);
      }
    });
    return unsubscribe;


  }, []);




  async function getNotifications() {
    try {
      const notificationsString = await AsyncStorage.getItem('notifications');
      return notificationsString ? JSON.parse(notificationsString) : [];
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      return [];
    }
  }

  async function storeNotifications(notifications) {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing notifications:', error);
    }
  }

  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState([
  ]);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // console.log(user.uid)
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
