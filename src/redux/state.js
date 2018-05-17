export default {
  // 全局state
  global: {
    a: '',
    b: {}
  },
  // home路由state
  home: {
    a: '',
    currentKey: 'blog',
    b: {}
  },
  // blog路由state
  blog: {
    currentKey: 'all',
    sortList: [],
    isSpin: true,
    articleData: [],
    pageParams: {
      currentPage: 1,
      pageSize: 5
    },
    total: 0,
    queryData: {
      sort: 'all',
      key: '',
      type: 'all'
    }
  },
  // 文章路由state
  article: {
    articleDetail: {},
    isSpin: true
  }
};
