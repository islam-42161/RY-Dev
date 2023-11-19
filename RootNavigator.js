// RootNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignedInStack from './SignedInStack';
import SignedOutStack from './SignedOutStack';
import { AuthContext } from './AuthProvider';

const RootNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
