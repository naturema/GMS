import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import numeral from "numeral";
import {
  List,
  Card,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Tag,
  Popconfirm,
  message
} from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./Manage.less";

const { Search } = Input;

@connect(({ blog, loading }) => ({
  blog,
  loading: loading.models.blog
}))
export default class BasicList extends PureComponent {
  state = {
    current: 1
  };
  componentDidMount() {
    this.props.dispatch({
      type: "blog/getBlog",
      payload: 1
    });
    this.props.dispatch({
      type: "blog/getBlogTotal"
    });
  }
  editBlog = item => {
    const self = this;
    console.log(item.item);
    self.props.dispatch({
      type: "blog/toEditBlog",
      payload: {
        value: "# " + item.item.blog_title + "\n" + item.item.blog_content,
        id: item.item.id
      }
    });
  };
  delBlog = item => {
    this.props
      .dispatch({
        type: "blog/delBlog",
        payload: item.item.id
      })
      .then(() => {
        message.success("删除成功");
        this.props.dispatch({
          type: "blog/getBlog",
          payload: this.state.current
        });
        this.props.dispatch({
          type: "blog/getBlogTotal"
        });
      });
  };
  render() {
    const { blog: { blogList, totalBlog }, loading } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{numeral(value).format("0,0")}篇</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showQuickJumper: true,
      pageSize: 5,
      total: totalBlog,
      current: this.state.current,
      onChange: page => {
        console.log(page);
        this.setState({
          current: page
        });
        this.props.dispatch({
          type: "blog/getBlog",
          payload: page
        });
      }
    };

    const ListContent = ({ data: { blog_desc, update_time } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{blog_desc}</div>
        <div className={styles.extra}>
          <p style={{ marginBottom: 0 }}>
            更新时间：{moment(update_time).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的博文" value={totalBlog} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="最近一周发布博文" value="9" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="我的草稿箱" value="3" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="博文列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: "0 32px 40px 32px" }}
            extra={extraContent}
          >
            <List
              size="large"
              loading={blogList.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              pagination={paginationProps}
              dataSource={blogList}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <a onClick={this.editBlog.bind(this, { item })}>编辑</a>,
                    <Popconfirm
                      title="确认删除此博文？"
                      onConfirm={this.delBlog.bind(this, { item })}
                      okText="是"
                      cancelText="否"
                    >
                      <a href="#">删除</a>
                    </Popconfirm>
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={
                      <a className={styles.listItemMetaTitle}>
                        {item.blog_title}
                      </a>
                    }
                    description={
                      <span>
                        <Tag color="blue">{item.tag_name_a}</Tag>
                        {item.tag_name_b && (
                          <Tag color="blue">{item.tag_name_b}</Tag>
                        )}
                      </span>
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
