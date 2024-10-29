// src/navigation/RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import StudentListScreen from '../screens/StudentListScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';

// Define the types for each screen's parameters
export type RootStackParamList = {
  Login: undefined;
  StudentList: { parentId: string };
  StudentDetail: { studentId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="StudentList"
      component={StudentListScreen}
      options={{ title: 'Students' }}
    />
    <Stack.Screen
      name="StudentDetail"
      component={StudentDetailScreen}
      options={{ title: 'Student Details' }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
