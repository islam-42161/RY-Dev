import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthProvider from '../AuthProvider'
import RootNavigator from '../RootNavigator'
import auth from '@react-native-firebase/auth';


const AppRoot = () => {
  const [user, setUser] = useState();
  const [notifications,setNotifications]=useState([
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
    ]
  );
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthProvider notifications={notifications} setNotifications={setNotifications} user={user} setUser={setUser}>
<RootNavigator/>
</AuthProvider>
)
}

export default AppRoot

const styles = StyleSheet.create({})