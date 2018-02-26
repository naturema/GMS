import React, { PureComponent, PropTypes } from "react";
import { connect } from "dva";
import ReactDOM from "react-dom";
import {
  Icon,
  Row,
  Col,
  Input,
  Button,
  Modal,
  message,
  AutoComplete,
  Tag
} from "antd";
const { TextArea } = Input;
import marked from "marked";
import highlight from "highlight.js";
import numeral from "numeral";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import "ant-design-pro/dist/ant-design-pro.css";
import TagSelect from "ant-design-pro/lib/TagSelect";

import styles from "./New.less";

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: code => {
    return highlight.highlightAuto(code).value;
  }
});
const hideStyle = {
  display: "none"
};
const showStyle = {
  display: "block"
};
const fullStyle = {
  width: "80%",
  marginTop: "-10px",
  paddingLeft: "5px"
};
const halfStyle = {
  marginTop: "-10px",
  borderLeft: "1px dashed #444",
  paddingLeft: "20px"
};
@connect(({ blog, loading }) => ({
  blog,
  loading: loading.effects[("blog/publishBlog", "blog/draftBlog")]
}))
export default class New extends PureComponent {
  state = {
    isEdit: true,
    previewStyle: showStyle,
    value: "",
    screenStyle: halfStyle,
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
    tags: [],
    tagValue: ""
  };

  componentWillMount() {
    this.state.value = this.props.blog.value;
  }
  handle = () => {
    this.setState({
      visible: true,
      tags: [],
      tagValue: ""
    });
    this.props.dispatch({
      type: "blog/getDataSource"
    });
  };
  draft = () => {
    this.props
      .dispatch({
        type: "blog/draftBlog",
        payload: this.state.value
      })
      .then(() => {
        if (this.props.blog.isDraft == "保存成功") {
          message.success("保存成功，可在草稿箱中查看");
        } else {
          message.error("保存失败，请重试");
        }
      });
  };
  changeEdit = () => {
    if (this.state.isEdit) {
      this.setState({
        isEdit: !this.state.isEdit,
        previewStyle: showStyle,
        screenStyle: halfStyle
      });
    } else {
      this.setState({
        isEdit: !this.state.isEdit,
        previewStyle: hideStyle,
        screenStyle: fullStyle
      });
    }
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    this.props
      .dispatch({
        type: "blog/publishBlog",
        payload: {
          value: this.state.value,
          tags: this.state.tags
        }
      })
      .then(() => {
        if (this.props.blog.isPublish == "发布成功") {
          message.success("提交成功");
          this.setState({
            visible: false,
            confirmLoading: false
          });
          this.props.dispatch({
            type: "blog/clearDraft"
          });
        } else {
          message.error("提交失败，请重试");
        }
      });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleChange = () => {
    this.setState({
      value: ReactDOM.findDOMNode(this.refs.textarea).value
    });
  };
  keyDownEvent = event => {
    if (event.keyCode == 9) {
      event.preventDefault();
      var indent = "    ";
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;
      var selected = window.getSelection().toString();
      selected = indent + selected.replace(/\n/g, "\n" + indent);
      console.log(event.target);
      event.target.value =
        event.target.value.substring(0, start) +
        selected +
        event.target.value.substring(end);
      event.target.setSelectionRange(
        start + indent.length,
        start + selected.length
      );
    }
  };
  handleSearch = value => {
    // this.setState({
    //   dataSource: !value ? [] : [value, value + value, value + value + value]
    // });
  };
  onSelect = value => {
    console.log(this.state.tags.length);
    this.state.tags.length < 2 && this.state.tags.indexOf(value) < 0
      ? this.state.tags.push(value)
      : null;
    this.setState({
      tagValue: ""
    });
  };
  changeTagValue = value => {
    this.setState({
      tagValue: value
    });
  };
  closeTag = tag => {
    const index = this.state.tags.indexOf(tag);
    this.state.tags.splice(index, 1);
    console.log(this.state.tags);
  };
  render() {
    const {
      visible,
      ModalText,
      confirmLoading,
      previewStyle,
      screenStyle,
      value,
      tags,
      tagValue
    } = this.state;
    const { blog: { isPublish, dataSource } } = this.props;
    return (
      <PageHeaderLayout>
        <Modal
          title="选择标签"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="发布"
          cancelText="取消"
        >
          <div className={styles.tagList}>
            已选标签：
            {tags.map((tag, index) => {
              return (
                <Tag
                  key={tag}
                  closable
                  afterClose={() => this.closeTag(tag)}
                  color="#108ee9"
                >
                  {tag}
                </Tag>
              );
            })}
          </div>
          <AutoComplete
            allowClear
            value={tagValue}
            onChange={this.changeTagValue}
            dataSource={dataSource}
            style={{ width: 350 }}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            placeholder="选择标签（最多2个）"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Modal>
        <div className={styles.content}>
          <a>
            <Icon
              type="arrows-alt"
              style={{ float: "right", marginRight: "1.5em" }}
              onClick={this.changeEdit}
            />
            <Button
              onClick={this.draft}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
                float: "right",
                marginRight: ".7rem",
                marginTop: "-.5rem"
              }}
            >
              保存
            </Button>
            <Button
              onClick={this.handle}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
                float: "right",
                marginRight: ".7rem",
                marginTop: "-.5rem"
              }}
            >
              发布
            </Button>
          </a>
          <Row type="flex" justify="center" gutter={16}>
            <Col span={12}>
              <TextArea
                autosize
                style={previewStyle}
                className={styles.markdown_textarea}
                name="mkinput"
                onChange={this.handleChange}
                onKeyDown={this.keyDownEvent}
                ref="textarea"
                defaultValue={value}
              />
            </Col>
            <Col span={12} style={screenStyle}>
              <div
                className="hljs"
                dangerouslySetInnerHTML={{
                  __html: marked(value)
                }}
              />
            </Col>
          </Row>
        </div>
      </PageHeaderLayout>
    );
  }
}
