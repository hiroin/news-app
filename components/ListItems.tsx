import { useState, VFC } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
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

type Props = {
  author: string;
  imageUrl: string;
  title: string;
  onPress: () => void;
};

const ListItem: VFC<Props> = ({ author, imageUrl, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        {!!imageUrl && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: imageUrl,
            }}
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text} numberOfLines={3}>
          {title}
        </Text>
        <Text style={styles.subText}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
