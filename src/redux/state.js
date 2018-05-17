export default {
  global: {
    a: '',
    b: {}
  },
  home: {
    a: '',
    currentKey: 'blog',
    b: {}
  },
  blog: {
    currentKey: 'all',
    sortList: [],
    isSpin: false,
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
  article: {
    articleDetail: {}
  }
};
