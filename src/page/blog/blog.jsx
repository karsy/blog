import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Avatar, Icon, Input, Select, Pagination, Spin } from 'antd';
import dayjs from 'dayjs';
import {
  alertHaha333,
  changeSort,
  getSortList,
  getArticleList,
  switchSpin,
  changePageParams,
  changeQueryData
} from '../../redux/action';
import { queryOpitons } from './const';

import './blog.less';

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.type = 'all';
    this.handleClick = this.handleClick.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount() {
    const { getSortList, getArticleList, pageParams, queryData } = this.props;
    getSortList();
    getArticleList(pageParams, queryData);
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
    const { getArticleList, changePageParams, switchSpin, queryData } = this.props;
    getArticleList({ currentPage: page, pageSize }, queryData);
    changePageParams(page, pageSize);
    switchSpin();
  }
  onSearch(value) {
    const { getArticleList, changeQueryData, queryData, pageParams } = this.props;
    getArticleList(pageParams, { ...queryData, key: value });
    changeQueryData({ ...queryData, key: value });
  }
  render() {
    const { sortList, articleData, currentKey, isSpin, pageParams, total } = this.props;
    const menuItems = sortList.map((item) => {
      return (
        <Menu.Item key={item.type}>
          {item.logo ? <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> : null}
          {item.name}
        </Menu.Item>
      );
    });
    const articleComponent = articleData && articleData.map((item) => {
      return (
        <li
          className="li-article"
          onClick={this.handleArticleClick.bind(this, item.id)}
          key={item.id}
        >
          <p className="article-title">{item.title}</p>
          <p className="article-sort-calendar">
            <span><Icon type="profile" />{item.sort}</span>
            <span><Icon type="calendar" />{dayjs(item.date).format('YYYY-MM-DD')}</span>
          </p>
          <p className="article-digest">{item.digest}</p>
        </li>
      );
    });
    const queryOpitonList = queryOpitons.map((item, index) => <Option key={index} value={item.key}>{item.value}</Option>);
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
                <span>文章列表</span>
                <span className="top-search-bar-search">
                  <InputGroup compact>
                    <Select
                      onChange={(value) => { this.props.changeQueryData({ ...this.props.queryData, type: value }); }}
                      defaultValue="all"
                    >{queryOpitonList}</Select>
                    <Search
                      placeholder="请输入关键字"
                      onSearch={this.onSearch}
                      style={{ width: 240 }}
                      enterButton
                    />
                  </InputGroup>
                </span>
              </div>
              <Spin size="large" spinning={isSpin}>
                <div className="list-article">
                  <ul>{articleComponent}</ul>
                </div>
              </Spin>
              <Pagination
                showQuickJumper
                pageSize={pageParams.pageSize}
                onChange={this.switchPage}
                current={pageParams.currentPage}
                total={total}
                showTotal={total => `共 ${total} 条`}
              />
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
  getArticleList: (pageParams, queryData) => dispatch(getArticleList(pageParams, queryData)),
  changePageParams: (page, pageSize) => dispatch(changePageParams(page, pageSize)),
  changeQueryData: value => dispatch(changeQueryData(value)),
  switchSpin: () => dispatch(switchSpin())
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
