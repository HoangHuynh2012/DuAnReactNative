import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
import LoginUser from '../Scence/LoginUser';
import RegisterUser from '../Scence/RegisterUser';
import ForgotPasswordUser from '../Scence/ForgotPassword';
import MainUser from '../Scence/Main';
//
const Stack = createStackNavigator();

const MainNavigatison = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* Run Main */}
        <Stack.Screen name="Main" component={MainUser} />
        <Stack.Screen name="Login" component={LoginUser} />
        <Stack.Screen name="Register" component={RegisterUser} />
        <Stack.Screen name="Forgot" component={ForgotPasswordUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigatison;

const styles = StyleSheet.create({});
