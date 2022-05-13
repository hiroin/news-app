import { VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ArticleScreen: VFC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Article Screen</Text>
    </SafeAreaView>
  );
};

export default ArticleScreen;
