import { VFC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import { RootStackParamList } from '../types/RootStackParamList';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;
type Props = {
  route: ProfileScreenRouteProp;
};

const ArticleScreen: VFC<Props> = ({ route }: Props) => {
  const { article } = route.params;
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(addClip({ clip: article }));
        }}
      >
        <Text style={{ margin: 10, fontSize: 30 }}>ADD_CLIP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(deleteClip({ clip: article }));
        }}
      >
        <Text style={{ margin: 10, fontSize: 30 }}>DELETE_CLIP</Text>
      </TouchableOpacity>
      <WebView source={{ uri: article.url }} />
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
