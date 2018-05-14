
import axios from 'axios';

export const changeCurrentKey = value => (dispatch) => {
  dispatch({
    type: 'CHANGE_KEY',
    payload: value
  });
};

export const alertHaha111 = value => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HAHA111',
      payload: value
    });
  }, 1000);
};

export const alertHaha222 = value => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HAHA222',
      payload: value
    });
  }, 1000);
};

export const alertHaha333 = value => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'HAHA333',
      payload: value
    });
  }, 1000);
};

export const changeSort = value => (dispatch) => {
  alert(`当前的分类是：${value}`);
  dispatch({
    type: 'CHANGE_SORT_KEY',
    payload: value
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
      console.log(error);
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

