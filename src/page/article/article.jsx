import React from 'react';
import { connect } from 'react-redux';
import { Anchor, Icon, Spin } from 'antd';
import dayjs from 'dayjs';
import NoComponent from '../../component/NoComponent';
import {
  getArticleById
} from '../../redux/action';
import { convertLexerToTree } from './const';

import './article.less';

const { Link } = Anchor;

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const { match, getArticleById } = this.props;
    getArticleById(match.params.id);
  }

  renderToc = () => {
    const { lexerData } = this.props;
    const tocData = convertLexerToTree(lexerData);
    const getChildToc = (data) => {
      return data.map((item) => {
        return (
          <Link key={`${item.depth}-${item.text}`} href={`#${item.text}`} title={item.text}>
            {getChildToc(item.child || [])}
          </Link>
        );
      });
    };
    return (
      <div className="toc-box">
        <Anchor>
          <div className="toc">
            <span className="toc-title">文章目录</span>
            { getChildToc(tocData) }
          </div>
        </Anchor>
      </div>
    );
  }

  render() {
    const { isSpin, articleDetail, mdHtml, lexerData } = this.props;
    const isShowToc = lexerData.length >= 1;
    return (
      <Spin size="large" spinning={isSpin}>
        <div className="article">
          {/* <div dangerouslySetInnerHTML="<span>111</span>" /> */}
          <NoComponent loading={!mdHtml}>
            <div className="article-post" style={{ width: `${isShowToc ? 900 : 1180}px` }}>
              <div className="article-title">{articleDetail.title}</div>
              <div className="article-sort-calendar">
                <span><Icon type="profile" />{articleDetail.sort}</span>
                <span>
                  <Icon type="calendar" />
                  { articleDetail.date ? dayjs(articleDetail.date).format('YYYY-MM-DD') : ''}
                </span>
              </div>
              <div className="article-digest"><span>摘要：</span>{articleDetail.digest}</div>
              <div className="readme">
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: mdHtml }} />
              </div>
            </div>
            { isShowToc ? this.renderToc() : null }
          </NoComponent>
        </div>
      </Spin>
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
