import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import { changeCurrentKey } from '../../redux/action';
import Blog from '../blog';

import './home.less';

const { Header, Footer, Content } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { history } = this.props;
    console.log('click ', e);
    if (e.key === this.props.currentKey) return;
    this.props.changeCurrentKey(e.key);
    history.push(`/home/${e.key}`);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="home">
        <Layout className="layout">
          <Header>
            <div className="logo">
              <img src="logo.png" alt="karsy博客" />
            </div>
            <div className="nav">
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.props.currentKey]}
                mode="horizontal"
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="blog">
                  <Icon type="mail" />博客
                </Menu.Item>
                <Menu.Item key="openSource">
                  <Icon type="mail" />开源
                </Menu.Item>
                <Menu.Item key="tool">
                  <Icon type="mail" />工具
                </Menu.Item>
                <Menu.Item key="message">
                  <Icon type="mail" />留言
                </Menu.Item>
                <Menu.Item key="about">
                  <Icon type="mail" />关于
                </Menu.Item>
              </Menu>
            </div>
          </Header>
          <Content>
            <Route exact path={`${match.url}`} component={Blog} />
            <Route path={`${match.url}/blog`} component={Blog} />
            <Route path={`${match.url}/openSource`} render={() => <h3>Please select a openSource.</h3>} />
            <Route path={`${match.url}/tool`} render={() => <h3>Please select a tool.</h3>} />
            <Route path={`${match.url}/message`} render={() => <h3>Please select a message.</h3>} />
            <Route path={`${match.url}/about`} render={() => <h3>Please select a about.</h3>} />
          </Content>
          <Footer>我们是共产主义接班人</Footer>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCurrentKey: value => dispatch(changeCurrentKey(value))
});

const mapStateToProps = ({ home, global }) => ({
  ...home,
  ...global
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
