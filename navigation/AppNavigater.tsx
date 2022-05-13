import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen, { Article } from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';

export type RootStackParamList = {
  Home: undefined;
  Article: { article: Article };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigater = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigater;
