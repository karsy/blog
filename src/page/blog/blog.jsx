import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Avatar, Icon, Input, Select, Pagination, Spin } from 'antd';
import dayjs from 'dayjs';
import EmptyData from '../../component/EmptyData';
import NoComponent from '../../component/NoComponent';
import {
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
    this.onSwitchPage = this.onSwitchPage.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    const { getSortList, getArticleList, pageParams, queryData } = this.props;
    getSortList();
    getArticleList(pageParams, queryData);
  }

  handleClick(e) {
    const { changeSort, getArticleList, currentKey, pageParams, queryData } = this.props;
    if (e.key === currentKey) return;
    changeSort(e.key);
    getArticleList(pageParams, { ...queryData, sort: e.key });
  }

  handleArticleClick(id) {
    const { history } = this.props;
    history.push(`/home/article/${id}`);
  }

  onSwitchPage(page, pageSize) {
    const { getArticleList, changePageParams, queryData } = this.props;
    getArticleList({ currentPage: page, pageSize }, queryData);
    changePageParams({ currentPage: page, pageSize });
  }

  onSearch(value) {
    const { getArticleList, changeQueryData, changePageParams, queryData, pageParams } = this.props;
    getArticleList({ ...pageParams, currentPage: 1 }, { ...queryData, key: value });
    changePageParams({ ...pageParams, currentPage: 1 });
    changeQueryData({ ...queryData, key: value });
  }

  renderMenu() {
    const { sortList, currentKey } = this.props;
    const menuItems = sortList.map((item) => {
      return (
        <Menu.Item key={item.type}>
          {item.logo ? <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> : null}
          {item.name}
        </Menu.Item>
      );
    });
    return (
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
    );
  }

  renderSearchBar() {
    const { changeQueryData, queryData } = this.props;
    const queryOpitonList = queryOpitons.map((item, index) => <Option key={index} value={item.key}>{item.value}</Option>);
    return (
      <div className="top-search-bar">
        <span>文章列表</span>
        <span className="top-search-bar-search">
          <InputGroup compact>
            <Select
              onChange={(value) => { changeQueryData({ ...queryData, type: value }); }}
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
    );
  }

  renderArticleList() {
    const { articleData, isSpin } = this.props;
    const articleComponent = articleData && articleData.length ? articleData.map((item) => {
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
    }) : <EmptyData />;
    return (
      <Spin size="large" spinning={isSpin} delay={500}>
        <div className="list-article">
          <NoComponent loading={isSpin}>
            <ul>{articleComponent}</ul>
          </NoComponent>
        </div>
      </Spin>
    );
  }

  renderPagination() {
    const { articleData, pageParams, total } = this.props;
    if (!(articleData && articleData.length)) {
      return null;
    }
    return (
      <Pagination
        showQuickJumper
        pageSize={pageParams.pageSize}
        current={pageParams.currentPage}
        total={total}
        showSizeChanger
        pageSizeOptions={['5', '10', '20', '50']}
        showTotal={total => `共 ${total} 条`}
        onChange={this.onSwitchPage}
        onShowSizeChange={(page, pageSize) => { this.onSwitchPage(1, pageSize); }}
      />
    );
  }

  render() {
    return (
      <div className="blog">
        <Row>
          <Col span={4}>
            { this.renderMenu() }
          </Col>
          <Col span={16}>
            <div className="list">
              { this.renderSearchBar() }
              { this.renderArticleList() }
              { this.renderPagination() }
            </div>
          </Col>
          <Col span={4}>col-4</Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeSort: key => dispatch(changeSort(key)),
  getSortList: () => dispatch(getSortList()),
  getArticleList: (pageParams, queryData) => dispatch(getArticleList(pageParams, queryData)),
  changePageParams: value => dispatch(changePageParams(value)),
  changeQueryData: value => dispatch(changeQueryData(value)),
  switchSpin: value => dispatch(switchSpin(value))
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
