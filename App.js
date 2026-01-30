import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Vibration} from 'react-native';


export default function App() {
  // Python habit: Initialize your variables (States)
  const [seconds, setSeconds] = useState(5 * 60); 
  const [bgColor, setBgColor] = useState('#FFFFFF'); // Fixed the hex code to 6 digits
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          triggerFlash();
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerFlash = () => {
    Vibration.vibrate([0, 500, 200, 500]);

    Alert.alert("Drink Up!", "Time to hydrate! 💧",[{text:'alr', onPress:() => setSeconds(5*60)}]);

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FFF333', '#33FFF3', '#FF3333'];
    setIsFlashing(true);
    
    colors.forEach((color, index) => {
      setTimeout(() => {
        setBgColor(color);
        if (index === colors.length - 1) {
          setTimeout(() => {
            setBgColor('#FFFFFF'); 
            setIsFlashing(false);
          }, 400);
        }
      }, index * 300);
    });
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>Water 🥤</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 40,
    color: '#333',
  }
});
