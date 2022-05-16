import React, { useEffect, useRef, useState } from 'react';
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
import { Article } from '../types/Article';
import { RootStackParamList } from '../types/RootStackParamList';
import Loading from '../components/Loading';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  // 画面の表示と関係ない変数はuseRefでもっておくと余計な再レンダリングをせずにすむ
  // articlesが変更された場合にのみ再レンダリングするようにuseRefを使った
  // useStateは非同期に反映される。useRefは即時反映される。
  const pageRef = useRef(1);
  const fetchAllRef = useRef(false);

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const fetchArticles = async (page: number) => {
    try {
      const response: ArticlesFetchNewsAPI = await axios.get(
        `${URL}&pageSize=10&page=${page}`,
      );
      if (response.data.articles.length > 0) {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      } else {
        fetchAllRef.current = true;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onEndReached = () => {
    if (fetchAllRef.current) return;
    pageRef.current = pageRef.current + 1;
    fetchArticles(pageRef.current);
  };

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
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
}
