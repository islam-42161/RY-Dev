// AuthProvider.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children,user,setUser,notifications,setNotifications,profileModalVisible,setProfileModalVisible,notificationsBadge,setNotificationsBadge}) => {

  // Add functions for signing in and signing out if needed

  return (
    <AuthContext.Provider value={{ user,setUser,notifications,setNotifications,profileModalVisible,setProfileModalVisible,notificationsBadge,setNotificationsBadge }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
