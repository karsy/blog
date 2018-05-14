import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import highlight from 'highlight.js';
import { } from 'antd';
import dayjs from 'dayjs';
// import toc from 'markdown-toc';
import {
  getArticleById
} from '../../redux/action';

import './article.less';

// 源码如下：
// Renderer.prototype.heading = (text, level, raw) => {
//   if (this.options.headerIds) {
//     return '<h'
//       + level
//       + ' id="'
//       + this.options.headerPrefix
//       + raw.toLowerCase().replace(/[^\w]+/g, '-')
//       + '">'
//       + text
//       + '</h'
//       + level
//       + '>\n';
//   }
//   // ignore IDs
//   return '<h' + level + '>' + text + '</h' + level + '>\n';
// };

// 重写heading源码，让id = text（当出现两个相同的toc时，会生成两个同样的id，这点待hack）
marked.Renderer.prototype.heading = (text, level, raw) => {
  return `<h${level} id="${text}">${text}</h${level}>\n`;
};
// 设置语法高亮
marked.setOptions({
  highlight: (code) => {
    console.log(highlight.highlightAuto(code).value);
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

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
    // console.log(JSON.stringify(this.props.articleDetail));
    const mdHtml = marked(this.props.articleDetail.content || '');
    const lexerData = marked.lexer(this.props.articleDetail.content || '').filter(item => item.type === 'heading');
    console.log(lexerData);
    // const tocX = toc(this.props.articleDetail.content || '');
    // console.log(tocRender(this.props.articleDetail.content || ''));
    // console.log(tocX);
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
