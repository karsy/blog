import { combineReducers } from 'redux';
import defaultState from './state.js';

// 全局通用配置
const global = (state = defaultState.global, { type, payload }) => {
  switch (type) {
    case 'HAHA111':
    {
      const value = payload;
      return {
        ...state,
        a: value
      };
    }
    default:
      return state;
  }
};

// home路由配置
const home = (state = defaultState.home, { type, payload }) => {
  switch (type) {
    case 'HAHA222':
    {
      const value = payload;
      alert(value);
      return {
        ...state,
        a: value
      };
    }
    case 'CHANGE_KEY':
    {
      const value = payload;
      return {
        ...state,
        currentKey: value
      };
    }
    default:
      return state;
  }
};

// blog路由配置
const blog = (state = defaultState.blog, { type, payload }) => {
  switch (type) {
    case 'HAHA333':
    {
      const value = payload;
      return {
        ...state,
        a: value
      };
    }
    case 'CHANGE_SORT_KEY':
    {
      const value = payload;
      return {
        ...state,
        currentKey: value
      };
    }
    case 'GET_SORTLIST':
    {
      const value = payload;
      return {
        ...state,
        sortList: value
      };
    }
    case 'GET_ARTICLE_LIST':
    {
      const value = payload;
      return {
        ...state,
        total: value.total,
        articleData: value.articleData,
        isSpin: false
      };
    }
    case 'CHANGE_PAGEPARAMS':
    {
      const value = payload;
      return {
        ...state,
        pageParams: value
      };
    }
    case 'CHANGE_QUERYDATA':
    {
      const value = payload;
      return {
        ...state,
        queryData: value
      };
    }
    case 'SWITCH_SPIN':
    {
      const value = payload;
      return {
        ...state,
        isSpin: value
      };
    }
    default:
      return state;
  }
};

// article路由配置
const article = (state = defaultState.article, { type, payload }) => {
  switch (type) {
    case 'GET_ARTICLE_DETAIL':
    {
      const value = payload;
      return {
        ...state,
        articleDetail: value
      };
    }
    case 'SWITCH_SPIN':
    {
      const value = payload;
      return {
        ...state,
        isSpin: value
      };
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  global,
  home,
  blog,
  article
});

export default reducer;
