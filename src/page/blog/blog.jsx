import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Avatar } from 'antd';
import dayjs from 'dayjs';
import {
  alertHaha333,
  changeSort,
  getSortList,
  getArticleList
} from '../../redux/action';

import './blog.less';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
  }
  componentDidMount() {
    this.props.getSortList();
    this.props.getArticleList();
  }
  handleClick(e) {
    if (e.key === this.props.currentKey) return;
    this.props.changeSort(e.key);
  }
  handleArticleClick(id) {
    const { history } = this.props;
    console.log('我的id: ', id);
    history.push(`/home/article/${id}`);
  }
  render() {
    const menuItems = this.props.sortList.map((item) => {
      return (
        <Menu.Item key={item.type}>
          {item.logo ? <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> : null}
          {item.name}
        </Menu.Item>
      );
    });
    console.log('articleList', this.props.articleList);
    const articleList = this.props.articleList.map((item) => {
      return (
        <li
          className="li-article"
          onClick={this.handleArticleClick.bind(this, item.id)}
          key={item.id}
        >
          <p>{item.title}</p>
          <p>{item.sort}</p>
          <p>{dayjs(item.date).format('YYYY-MM-DD')}</p>
          <p>{item.digest}</p>
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
                selectedKeys={[this.props.currentKey]}
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
              <div className="top-search-bar">文章列表</div>
              <div className="list-article">
                <div style={{ height: '2000px' }}>
                  <ul>
                    {articleList}
                  </ul>
                </div>
              </div>
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
  getArticleList: type => dispatch(getArticleList(type))
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
