import { VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ArticleScreen: VFC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: 'https://expo.dev' }} />
    </SafeAreaView>
  );
};

export default ArticleScreen;
