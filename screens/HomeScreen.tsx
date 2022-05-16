import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaViewBase,
  SafeAreaView,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  // 画面の表示と関係ない変数はuseRefでもっておくと余計な再レンダリングをせずにすむ
  // articlesが変更された場合にのみ再レンダリングするようにuseRefを使った
  // useStateは非同期に反映される。useRefは即時反映される。
  const pageRef = useRef(1);
  const fetchAllRef = useRef(false);

  useEffect(() => {
    setLoading(true);
    fetchArticles(1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setArticles([]);
    pageRef.current = 1;
    fetchAllRef.current = false;
    await fetchArticles(1);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
}
