import React, { ComponentProps } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen, { Article } from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ClipScreen from '../screens/ClipScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

export type RootStackParamList = {
  Home: undefined;
  Article: { article: Article };
  Clip: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clip" component={ClipScreen} />
    </Stack.Navigator>
  );
};

export type GlyphNames = ComponentProps<typeof FontAwesome>['name'];

const screenOption = ({ route }: any) => {
  tabBarIcon: ({ color, size }: any) => {
    let iconName: GlyphNames;

    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Settings') {
      iconName = 'bookmark';
    } else {
      return;
    }
    return <FontAwesome name={iconName} size={24} color="black" />;
  };
};

const AppNavigaotor = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Clip" component={ClipStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigaotor;
