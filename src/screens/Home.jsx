import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import MainContainer from './MainContainer';
import { getQuoteOfToday } from '../../firebase/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { Image } from 'expo-image';
import { useTheme } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const Home = ({route,navigation}) => {
  const theme = useTheme()
  const [quote,setQuote] = useState();
  useEffect(()=>{
    getQuoteOfToday().then(quoteData => {
      console.log(quoteData);
      setQuote(quoteData);
    });
  },[])
  return (
    <MainContainer title={"Home"} navigation={navigation}>
    <View style={{marginHorizontal:20,marginTop:10,paddingTop:10,gap:10,elevation:5,backgroundColor:theme.colors.background,borderRadius:20,overflow:'hidden',alignItems:'center'}}>
      <Text style={[theme.fonts.titleMedium]}>🗨️ Quote Of The Day</Text>
    {quote && 
      <AnimatedImage
      entering={FadeIn.duration(1000)}
        source={{uri:quote.quote}}
        style={{width:"100%",aspectRatio:1}}
        contentFit='cover'
      />
    }
    </View>

    </MainContainer>
  );
};

export default Home;
