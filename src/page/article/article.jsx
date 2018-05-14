import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import { } from 'antd';
import dayjs from 'dayjs';
import {
  getArticleById
} from '../../redux/action';

import './article.less';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const { match } = this.props;
    this.props.getArticleById(match.params.id);
  }

  render() {
    console.log(JSON.stringify(this.props.articleDetail));
    const mdHtml = marked(this.props.articleDetail.content || '');
    console.log(mdHtml);
    return (
      <div className="article">
        <div className="readme">
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: mdHtml }} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getArticleById: id => dispatch(getArticleById(id))
});

const mapStateToProps = ({ global, article }) => ({
  ...global,
  ...article
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
