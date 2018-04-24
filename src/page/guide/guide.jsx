import React from 'react';
import { connect } from 'react-redux';

import Header from '../../component/header';
import Footer from '../../component/footer';

import { alertHaha333 } from '../../redux/action';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="home">
        <Header />
        我是首页
        <button
          onClick={() => {
            this.props.alertHaha333('333');
          }}
        >点击我</button>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  alertHaha333: value => dispatch(alertHaha333(value))
});

const mapStateToProps = ({ guide, global }) => ({
  ...guide,
  ...global
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
