import { Article } from '../../screens/HomeScreen';
import { ActionClip } from '../actions/user';

const initialState = {
  clips: [],
};

const reducer = (state = initialState, action: ActionClip) => {
  switch (action.type) {
    case 'ADD_CLIP':
      return {
        ...state, // 前回のclipを展開する
        clips: [...state.clips, action.clip], //clipsの中身だけを書き換える [ 前回のclipにaction.clipを追加する ]
      };
    case 'DELETE_CLIP':
      return {
        ...state, // 前回のclipを展開する
        clips: state.clips.filter(
          (clip: Article) => clip.url !== action.clip.url,
        ), // 同じurl以外のclipだけを抽出してclipsに再格納する
      };
    default:
      return state;
  }
};

export default reducer;
