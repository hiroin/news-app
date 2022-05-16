import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.congtainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  congtainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
