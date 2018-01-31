import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import ReactDOM from "react-dom";
import { Icon, Row, Col, Input, Button, Modal, message } from "antd";
import marked from "marked";
import highlight from "highlight.js";
import numeral from "numeral";

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
export default class Analysis extends Component {
  state = {
    isEdit: true,
    previewStyle: showStyle,
    value: "## Hello Gatinul , write now ! \n > 20170613",
    count: 0,
    screenStyle: halfStyle,
    ModalText: "Content of the modal",
    visible: false
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

  render() {
    const { visible, ModalText, previewStyle, screenStyle, value } = this.state;

    return (
      <div className={styles.content}>
        <a>
          <Icon
            type="arrows-alt"
            style={{ float: "right", marginRight: "1.5em" }}
            onClick={this.changeEdit}
          />
        </a>
        <Row type="flex" justify="center" gutter={16}>
          <Col span={12}>
            <textarea
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
    );
  }
}
