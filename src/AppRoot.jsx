import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthProvider from '../AuthProvider'
import RootNavigator from '../RootNavigator'
import auth from '@react-native-firebase/auth';


const AppRoot = () => {
  const [user, setUser] = useState();
  const [notifications,setNotifications]=useState([]);
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