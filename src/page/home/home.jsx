import React from 'react';
import { connect } from 'react-redux';

import Header from '../../component/header';
import Footer from '../../component/footer';

import { alertHaha111, alertHaha222 } from '../../redux/action';

import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { a, alertHaha111 } = this.props;
    return (
      <div className="home">
        <Header />
        我是首页111
        我的值是：{a}
        <button
          onClick={() => {
            alertHaha111('111');
          }}
        >点击我</button>
        <Footer />
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
