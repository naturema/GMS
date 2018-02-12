import React, { PureComponent, PropTypes } from "react";
import { connect } from "dva";
import ReactDOM from "react-dom";
import { Icon, Spin, Button, Avatar, message, List } from "antd";
import numeral from "numeral";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./Draft.less";

@connect(({ blog, loading }) => ({
  blog,
  loading: loading.effects["blog/getDraft"]
}))
export default class Draft extends PureComponent {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: false,
    index: 0
  };
  componentWillUnmount() {
    const self = this;
    const { dispatch, blog } = self.props;
    dispatch({
      type: "blog/clearDraft"
    });
  }
  componentWillMount() {
    const { dispatch } = this.props;
    const self = this;
    dispatch({
      type: "blog/getDraft",
      payload: self.state.index
    }).then(() => {
      self.setState({
        loading: false,
        showLoadingMore: true,
        index: self.state.index + 6
      });
    });
  }
  onLoadMore = () => {
    const self = this;
    self.setState({
      loadingMore: true
    });
    self.props
      .dispatch({
        type: "blog/getDraft",
        payload: self.state.index
      })
      .then(() => {
        self.setState({
          loadingMore: false,
          index: self.state.index + 6
        });
        console.log(self.props.blog);
        if (!self.props.blog.more) {
          self.setState({
            showLoadingMore: false
          });
        }
        window.dispatchEvent(new Event("resize"));
      });
  };
  delDraft = item => {
    const self = this;
    console.log(item.item.id);
    self.props
      .dispatch({
        type: "blog/delDraft",
        payload: item.item.id
      })
      .then(res => {
        message.success("删除成功");
      });
  };
  editDraft = item => {
    const self = this;
    self.props.dispatch({
      type: "blog/editDraft",
      payload: "# " + item.item.blog_title + "\n" + item.item.blog_content
    });
  };
  render() {
    const { loading, loadingMore, showLoadingMore } = this.state;
    const { blog: { draftList } } = this.props;
    const loadMore = showLoadingMore ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px"
        }}
      >
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>查看更多</Button>}
      </div>
    ) : null;
    return (
      <PageHeaderLayout>
        <List
          className="demo-loadmore-list"
          loading={loading}
          loadMore={loadMore}
          itemLayout="horizontal"
          dataSource={draftList}
          renderItem={item => (
            <List.Item
              actions={[
                <a onClick={this.editDraft.bind(this, { item })}>编辑</a>,
                <a onClick={this.delDraft.bind(this, { item })}>删除</a>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a>{item.blog_title}</a>}
                description={item.blog_desc}
              />
            </List.Item>
          )}
        />
      </PageHeaderLayout>
    );
  }
}
