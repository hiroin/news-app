import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
import ListItem from '../components/ListItems';
import Constants from 'expo-constants';
import axios from 'axios';
import { useSelector } from 'react-redux';

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest?.extra?.newsApiKey}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
});

type ArticlesFetchNewsAPI = {
  data: {
    articles: {
      author: string;
      description: string;
      title: string;
      urlToImage: string;
      url: string;
    }[];
  };
};

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { Article } from '../types/Article';
import { User } from '../types/User';
import { State } from '../types/State';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ClipScreen({ navigation }: Props) {
  const user = useSelector((state: State) => state.user) as User;
  const { clips } = user;

  const renderItem = ({ item }: { item: Article }) => (
    <ListItem
      author={item.author}
      title={item.title}
      imageUrl={item.urlToImage}
      onPress={() => {
        navigation.navigate('Article', { article: item });
      }}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={clips}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
