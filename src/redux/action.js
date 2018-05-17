
import axios from 'axios';

export const switchSpin = value => (dispatch) => {
  dispatch({
    type: 'SWITCH_SPIN',
    payload: value
  });
};

/**  主页  **/
export const changeCurrentKey = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_KEY',
    payload: value
  });
};

/**  博客首页  **/
export const changeSort = key => (dispatch) => {
  alert(`当前的分类是：${key}`);
  dispatch({
    type: 'CHANGE_SORT_KEY',
    payload: key
  });
};

export const getSortList = () => (dispatch) => {
  const value = [
    {
      name: '全部文章',
      type: 'all',
      logo: '',
      description: 'react是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'react',
      type: 'react',
      logo: '1',
      description: 'react是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'ant',
      type: 'ant',
      logo: '2',
      description: 'ant是一个很牛逼的框架',
      date: '2018-05-05'
    },
    {
      name: 'node',
      type: 'node',
      logo: '3',
      description: 'node是一个很牛逼的框架',
      date: '2018-05-05'
    }
  ];
  axios.get('/user?ID=12345')
    .then((response) => {
      console.log(response);
      dispatch({
        type: 'GET_SORTLIST',
        payload: value
      });
      // dispatch({
      //   type: 'CHANGE_SORT_KEY',
      //   payload: value.length ? value[0].type : ''
      // });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: 'GET_SORTLIST',
        payload: value
      });
      // dispatch({
      //   type: 'CHANGE_SORT_KEY',
      //   payload: value.length ? value[0].type : ''
      // });
    });
};

export const getArticleList = (pageParams, queryData) => (dispatch) => {
  switchSpin(true)(dispatch);
  axios.get('http://localhost:3001/blog/queryArticle', {
    params: {
      type: queryData.type,
      key: queryData.key,
      sort: queryData.sort,
      currentPage: pageParams.currentPage,
      pageSize: pageParams.pageSize
    }
  })
    .then((response) => {
      const articleData = response.data.content.retValue;
      const total = response.data.content.total;
      switchSpin(false)(dispatch);
      dispatch({
        type: 'GET_ARTICLE_LIST',
        payload: { total, articleData }
      });
    });
};

export const changePageParams = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_PAGEPARAMS',
    payload: value
  });
};

export const changeQueryData = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_QUERYDATA',
    payload: value
  });
};


/**  文章详情页  **/
export const getArticleById = id => (dispatch) => {
  axios.get('http://localhost:3001/blog/getArticleById', {
    params: {
      id
    }
  })
    .then((response) => {
      const data = response.data.content.retValue;
      switchSpin(false)(dispatch);
      dispatch({
        type: 'GET_ARTICLE_DETAIL',
        payload: data
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
