import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from './src/screens/Notifications';
import { useTheme } from 'react-native-paper';
import RYDrawer from './src/components/RYDrawer';
import { Ionicons } from '@expo/vector-icons';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Navigator = Drawer.Navigator;
const Screen = Drawer.Screen;
const SignedInStack = () => {
const theme = useTheme()
  return (
<Navigator initialRouteName='home' drawerContent={props=><RYDrawer {...props}/>} screenOptions={{
    header:()=>null,
    drawerActiveBackgroundColor:theme.colors.secondary,
    drawerActiveTintColor:theme.colors.onSecondary,
    drawerType:'slide'
}}>
    <Screen name='home' component={Home} options={{
      title:'Home',
      drawerIcon:({color})=>(
        <Ionicons name="home-outline" size={22} color={color} />
      )
    }} />
    <Screen name='notifications' options={{title:'Notifications'}} component={Notifications}/>
</Navigator>
  )
}

export default SignedInStack