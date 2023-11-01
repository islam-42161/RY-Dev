import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from './src/screens/Register';
import LoginEmail from './src/screens/LoginEmail';
import LoginPhone from './src/screens/LoginPhone';


const Stack = createNativeStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;
const RootStackNavigator = () => {

  return (
    <NavigationContainer>
<Navigator initialRouteName='loginemail' screenOptions={{
    header:()=>null
}}>
    <Screen name='loginemail' component={LoginEmail}/>
    <Screen name='register' component={Register}/>
    <Screen name='loginphone' component={LoginPhone}/>
</Navigator>
    </NavigationContainer>
  )
}

export default RootStackNavigator