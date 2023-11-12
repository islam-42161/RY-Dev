import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from './src/screens/register/Register';
import LoginEmail from './src/screens/LoginEmail';
import LoginPhone from './src/screens/LoginPhone';


const Stack = createNativeStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;
const SignedOutStack = () => {

  return (
    <NavigationContainer>
<Navigator initialRouteName='loginphone' screenOptions={{
    header:()=>null
}}>
    <Screen name='loginphone' component={LoginPhone}/>
    <Screen name='loginemail' component={LoginEmail}/>
    <Screen name='register' component={Register}/>
</Navigator>
    </NavigationContainer>
  )
}

export default SignedOutStack