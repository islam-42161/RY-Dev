import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from './src/screens/Notifications';
import { useTheme } from 'react-native-paper';
import RYDrawer from './src/components/RYDrawer';

import Activities from './src/screens/Activities';
import MyCourses from './src/screens/Courses/MyCourses';
import AllCourses from './src/screens/Courses/AllCourses';
import MyGroups from './src/screens/Groups/MyGroups';
import AllGroups from './src/screens/Groups/AllGroups';
import TaskBoard from './src/screens/TaskBoard';
import RYFeeds from './src/screens/RYFeeds';
import Coach from './src/screens/Coach';
import Wallpapers from './src/screens/Wallpapers';


// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Navigator = Drawer.Navigator;
const Screen = Drawer.Screen;
const SignedInStack = () => {
const theme = useTheme()
  return (
<Navigator initialRouteName='home' drawerContent={props=><RYDrawer {...props}/>} screenOptions={{
    header:()=>null,
    drawerType:'slide'
}}>
    <Screen name='home' component={Home}/>
    <Screen name='activities' component={Activities}/>
    <Screen name='taskboard' component={TaskBoard}/>
    <Screen name='wallpapers' component={Wallpapers}/>
    
    {/* courses */}
    <Screen name='mycourses' component={MyCourses}/>
    <Screen name='allcourses' component={AllCourses}/>
    {/* groups */}
    <Screen name='mygroups' component={MyGroups}/>
    <Screen name='allgroups' component={AllGroups}/>

    <Screen name='ryfeeds' component={RYFeeds}/>
    <Screen name='coach' component={Coach}/>
    <Screen name='notifications' component={Notifications}/>

</Navigator>
  )
}

export default SignedInStack