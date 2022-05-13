import { Article } from '../../screens/HomeScreen';

export type ActionClip = { type: string; clip: Article };

export const addClip = ({ clip }: { clip: Article }): ActionClip => {
  return {
    type: 'ADD_CLIP',
    clip,
  };
};

export const deleteClip = ({ clip }: { clip: Article }): ActionClip => {
  return {
    type: 'DELETE_CLIP',
    clip,
  };
};
