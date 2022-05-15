import { Article } from './Article';

export type RootStackParamList = {
  Home: undefined;
  Article: { article: Article };
  Clip: undefined;
};
