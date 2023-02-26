import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';


export function Loading (props){
    return(
        <View style={{flex:1, width:'100%',alignItems:'center',justifyContent:'center'}}>
        <LottieView
        autoPlay
        style={{
          width: props.width,
          height: props.height,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../animations/networkAnimation.json')}
      />
      </View>
    )
}