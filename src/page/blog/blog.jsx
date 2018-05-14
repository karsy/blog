import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Avatar } from 'antd';
import {
  alertHaha333,
  changeSort,
  getSortList
} from '../../redux/action';

import './blog.less';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getSortList();
  }
  handleClick(e) {
    if (e.key === this.props.currentKey) return;
    this.props.changeSort(e.key);
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
    console.log('defaultSortKey', this.props.defaultSortKey);
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
              <div className="list-active">
                <div style={{ height: '2000px' }}>
                  <ul>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
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
  changeSort: value => dispatch(changeSort(value)),
  getSortList: () => dispatch(getSortList())
});

const mapStateToProps = ({ global, blog }) => ({
  ...global,
  ...blog
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
