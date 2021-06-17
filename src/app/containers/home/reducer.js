import {actions} from './actions';
import { cloneDeep } from 'lodash';
const initialState = {
  friendsList:[]
}
const defaultList = [
  {
  name:'Santosh Jangle',
  isFavorite: false,
  },
  {
    name:'Kaustub Dhanudiyal',
    isFavorite: false,
  },
  {
    name:'Shubham Mhaskar',
    isFavorite: false,
  },
  {
    name:'Vijay Bisht',
    isFavorite: false,
  },
  {
    name:'Ankit Agarwal',
    isFavorite: false,
  }
]
export default function homeReducer(state = initialState, action) {
  let list = cloneDeep(state.friendsList);
    switch (action.type) {
      case actions.FETCH_FRIENDS:
        return Object.assign({}, state, {
          friendsList:defaultList});
      case actions.ADD_TO_LIST:
        let frndObj = {
          name: action.payload.name,
          isFavorite: false,
        }
        list.push(frndObj);
        return Object.assign({}, state, {
          friendsList:list});
      case actions.REMOVE_FROM_LIST:
        let index = list.findIndex((obj)=> obj.name === action.payload.frnd.name);
        if(index > -1)
        {
          list.splice(index,1);
        }
        return Object.assign({}, state, {
          friendsList:list});
      default:
        return state;
    }
};