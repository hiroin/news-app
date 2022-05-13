import { VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigater';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;
type Props = {
  route: ProfileScreenRouteProp;
};

const ArticleScreen: VFC<Props> = ({ route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: route.params.article.url }} />
    </SafeAreaView>
  );
};
export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
