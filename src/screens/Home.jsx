
import React from 'react'
import { View, Text, StatusBar } from 'react-native';
import MainContainer from './MainContainer';

const Home = ({route,navigation}) => {

  return (
    <MainContainer title={"Home"} navigation={navigation}>
    </MainContainer>
  );
};

export default Home;