import { VFC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import { RootStackParamList } from '../types/RootStackParamList';
import { State } from '../types/State';
import { ClipButton } from '../components/ClipButton';
import Loading from '../components/Loading';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;
type Props = {
  route: ProfileScreenRouteProp;
};

const ArticleScreen: VFC<Props> = ({ route }: Props) => {
  const { article } = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const { clips } = user;
  const isClipped = () => {
    return clips.some((clip) => clip.url === article.url);
  };

  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip({ clip: article }));
    } else {
      dispatch(addClip({ clip: article }));
    }
  };

  return (
    // SafeAreaViewを適用すると上部に空白があくのでViewに置換した
    // SafeAreaViewじゃなくても表示に問題なさそう
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView
        source={{ uri: article.url }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
    </View>
    // </SafeAreaView>
  );
};
export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
