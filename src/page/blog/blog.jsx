import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Avatar, Icon, Input, Pagination, Spin } from 'antd';
import dayjs from 'dayjs';
import {
  alertHaha333,
  changeSort,
  getSortList,
  getArticleList,
  switchSpin
} from '../../redux/action';

import './blog.less';

const Search = Input.Search;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.switchPage = this.switchPage.bind(this);
  }
  componentDidMount() {
    this.props.getSortList();
    this.props.getArticleList('all', 1);
  }
  handleClick(e) {
    if (e.key === this.props.currentKey) return;
    this.props.changeSort(e.key);
  }
  handleArticleClick(id) {
    const { history } = this.props;
    history.push(`/home/article/${id}`);
  }
  switchPage(page, pageSize) {
    const { getArticleList, switchSpin } = this.props;
    getArticleList('all', page);
    switchSpin()
  }
  render() {
    const {
      sortList,
      articleData,
      currentKey,
      isSpin
    } = this.props;
    const menuItems = sortList.map((item) => {
      return (
        <Menu.Item key={item.type}>
          {item.logo ? <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> : null}
          {item.name}
        </Menu.Item>
      );
    });
    const articleList = articleData.articleList && articleData.articleList.map((item) => {
      return (
        <li
          className="li-article"
          onClick={this.handleArticleClick.bind(this, item.id)}
          key={item.id}
        >
          <p className="article-title">{item.name}</p>
          <p className="article-sort-calendar">
            <span><Icon type="profile" />{item.sort}</span>
            <span><Icon type="calendar" />{dayjs(item.date).format('YYYY-MM-DD')}</span>
          </p>
          <p className="article-digest">{item.description}</p>
        </li>
      );
    });
    return (
      <div className="blog">
        <Row>
          <Col span={4}>
            <div className="menu">
              <div className="top-search-bar">文章分类</div>
              <Menu
                selectedKeys={[currentKey]}
                onClick={this.handleClick}
                theme="light"
                mode="inline"
              >
                {menuItems}
              </Menu>
            </div>
          </Col>
          <Col span={16}>
            <div className="list">
              <div className="top-search-bar">
                <Col span={1} />
                <Col span={3}>文章列表</Col>
                <Col span={12} />
                <Col span={7}>
                  文章搜索：
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 194 }}
                  />
                </Col>
                <Col span={1} />
              </div>
              <Spin size="large" spinning={isSpin}>
                <div className="list-article">
                  <div style={{ height: '880px' }}>
                    <ul>
                      {articleList}
                    </ul>
                  </div>
                </div>
              </Spin>
              <Pagination showQuickJumper pageSize={10} onChange={this.switchPage} defaultCurrent={1} total={articleData.allCount || 0} />
            </div>
          </Col>
          <Col span={4}>col-4</Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  alertHaha333: value => dispatch(alertHaha333(value)),
  changeSort: key => dispatch(changeSort(key)),
  getSortList: () => dispatch(getSortList()),
  getArticleList: (type, page) => dispatch(getArticleList(type, page)),
  switchSpin: () => dispatch(switchSpin())
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
