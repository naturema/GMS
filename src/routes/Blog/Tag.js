import React, { Component } from "react";
import { connect } from "dva";
import {
  Form,
  Input,
  Card,
  Button,
  Icon,
  List,
  Select,
  Modal,
  message,
  Popconfirm
} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Ellipsis from "../../components/Ellipsis";
import styles from "./Tag.less";

@connect(({ blog, loading }) => ({
  blog,
  loading: loading.models.blog
}))
class TagList extends Component {
  state = {
    confirmLoading: false,
    visible: false,
    editId: ""
  };
  componentDidMount() {
    this.props.dispatch({
      type: "blog/getTags"
    });
  }
  newTag = () => {
    this.setState({
      visible: true,
      editId: "",
      editColor: ""
    });
    this.props.dispatch({
      type: "blog/getTagColor"
    });
    this.props.form.setFieldsValue({
      name: "",
      color: "",
      desc: ""
    });
  };
  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({
          confirmLoading: true
        });
        if (this.state.editId) {
          this.props
            .dispatch({
              type: "blog/editTag",
              payload: {
                value: values,
                id: this.state.editId,
                color: this.state.editColor
              }
            })
            .then(() => {
              message.success("编辑成功");
              this.setState({
                visible: false,
                confirmLoading: false
              });
              this.props.dispatch({
                type: "blog/getTags"
              });
            });
        } else {
          this.props
            .dispatch({
              type: "blog/newTag",
              payload: {
                value: values
              }
            })
            .then(() => {
              message.success("新增成功");
              this.setState({
                visible: false,
                confirmLoading: false
              });
              this.props.dispatch({
                type: "blog/getTags"
              });
            });
        }
      }
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  editTag = item => {
    this.setState({
      editId: item.item.id,
      editColor: item.item.tag_color,
      visible: true
    });
    this.props.dispatch({
      type: "blog/getTagColor"
    });
    this.props.form.setFieldsValue({
      name: item.item.tag_name,
      color: item.item.tag_color,
      desc: item.item.tag_desc
    });
  };
  delTag = item => {
    this.props
      .dispatch({
        type: "blog/delTag",
        payload: {
          id: item.item.id,
          color: item.item.tag_color
        }
      })
      .then(() => {
        message.success("删除成功");
        this.props.dispatch({
          type: "blog/getTags"
        });
      });
  };
  render() {
    const { visible, confirmLoading, value } = this.state;
    const { blog: { tagList, colorData }, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const options = colorData.map(d => (
      <Option
        style={{ backgroundColor: d.color, height: "40px" }}
        value={d.color}
        key={d.id}
      >
        {d.color}
      </Option>
    ));
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          博文标签的维护页面，提供新建标签，编辑标签，以及删除标签，每个标签设定一个主题色，以便在blog-plus项目中应用，
          标签使用在发布博客时，选择标签列表中已有的标签。
        </p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="static/extra.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="标签列表"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <Modal
            title="标签编辑"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                label="标签名称"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "请填写标签名称!" }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="tags-o"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="填写标签名称"
                  />
                )}
              </FormItem>
              <FormItem
                label="标签颜色"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator("color", {
                  rules: [{ required: true, message: "请选择标签颜色" }]
                })(<Select onChange={this.selectChange}>{options}</Select>)}
              </FormItem>
              <FormItem
                label="标签描述"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator("desc")(
                  <TextArea autosize={{ minRows: 3 }} />
                )}
              </FormItem>
            </Form>
          </Modal>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={["", ...tagList]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a onClick={this.editTag.bind(this, { item })}>编辑</a>,
                      <Popconfirm
                        title="确认删除此标签？"
                        onConfirm={this.delTag.bind(this, { item })}
                        okText="是"
                        cancelText="否"
                      >
                        <a href="#">删除</a>
                      </Popconfirm>
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        // <img
                        //   alt=""
                        //   className={styles.cardAvatar}
                        //   src={item.avatar}
                        // />
                        <div
                          className={styles.cardAvatar}
                          style={{
                            backgroundColor: item.tag_color
                          }}
                        />
                      }
                      title={<a href="#">{item.tag_name}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.tag_desc}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button
                    onClick={this.newTag}
                    type="dashed"
                    className={styles.newButton}
                  >
                    <Icon type="plus" /> 新增标签
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderLayout>
    );
  }
}

const TagManage = Form.create()(TagList);
export default TagManage;
