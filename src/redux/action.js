
import axios from 'axios';
import marked from 'marked';
import highlight from 'highlight.js';

// 重写heading源码，自定义render，同时修复``转成code的问题，让id = text（当出现两个相同的toc时，会生成两个同样的id，这点待fix）
marked.Renderer.prototype.heading = (text, level) => {
  const rules = [
    { from: /<code>/g, to: '`' },
    { from: /<\/code>/g, to: '`' }
  ];
  const saveText = text;
  let decodeText = text;
  rules.forEach((item) => { decodeText = decodeText.replace(item.from, item.to); });
  return `<h${level} id="${decodeText}">${saveText}</h${level}>\n`;
};

// 设置语法高亮
marked.setOptions({
  highlight: (code) => {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

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
      type: 'a1',
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
      const mdHtml = marked(data.content);
      const lexerData = marked.lexer(data.content).filter(item => item.type === 'heading');
      switchSpin(false)(dispatch);
      dispatch({
        type: 'GET_ARTICLE_DETAIL',
        payload: {
          data,
          mdHtml,
          lexerData
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
