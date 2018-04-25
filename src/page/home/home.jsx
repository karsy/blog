import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Button } from 'antd';

import { alertHaha111, alertHaha222 } from '../../redux/action';

import './home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { a, alertHaha111 } = this.props;
    return (
      <div className="home">
        我是首页111
        我的值是：{a}
        <Button
          onClick={() => {
            alertHaha111('111');
          }}
        >点击我</Button>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="mail">
            <Icon type="mail" />Navigation One
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />Navigation Two
          </Menu.Item>
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  alertHaha111: value => dispatch(alertHaha111(value)),
  alertHaha222: value => dispatch(alertHaha222(value))
});

const mapStateToProps = ({ home, global }) => ({
  ...home,
  ...global
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
