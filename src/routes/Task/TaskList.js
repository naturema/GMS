import React, { Component } from "react";
import moment from "moment";
import { connect } from "dva";
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Form,
  Button,
  Select,
  Icon,
  DatePicker,
  Modal,
  message
} from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./TaskList.less";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Search } = Input;
const { TextArea } = Input;

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task
}))
class TaskList extends Component {
  state = {
    current: 1,
    taskType: "",
    taskStatus: "",
    confirmLoading: false,
    visible: false
  };
  componentDidMount() {
    this.props.dispatch({
      type: "task/getAllTask",
      payload: {
        page: 1
      }
    });
    this.props.dispatch({
      type: "task/getCount"
    });
    this.props.dispatch({
      type: "task/getTotalTask"
    });
  }
  changeType = e => {
    this.props.dispatch({
      type: "task/getAllTask",
      payload: {
        page: 1,
        type: e.target.value,
        status: this.state.taskStatus
      }
    });
    this.props.dispatch({
      type: "task/getTotalTask",
      payload: {
        type: e.target.value,
        status: this.state.taskStatus
      }
    });
    this.setState({
      taskType: e.target.value,
      current: 1
    });
  };
  changeStatus = value => {
    this.props.dispatch({
      type: "task/getAllTask",
      payload: {
        page: 1,
        type: this.state.taskType,
        status: value
      }
    });
    this.props.dispatch({
      type: "task/getTotalTask",
      payload: {
        type: this.state.taskType,
        status: value
      }
    });
    this.setState({
      taskStatus: value,
      current: 1
    });
  };
  disabledDate = current => {
    // Can not select days before today
    return (
      current <
      moment()
        .subtract(1, "days")
        .endOf("day")
    );
  };
  doneTask = item => {
    this.props
      .dispatch({
        type: "task/changeTask",
        payload: item.item.id
      })
      .then(() => {
        message.success("更改成功");
        this.props.dispatch({
          type: "task/getAllTask",
          payload: {
            page: this.state.current,
            type: this.state.taskType,
            status: this.state.taskStatus
          }
        });
        this.props.dispatch({
          type: "task/getCount"
        });
        this.props.dispatch({
          type: "task/getTotalTask",
          payload: {
            type: this.state.taskType,
            status: this.state.taskStatus
          }
        });
      });
  };
  delTask = item => {
    this.props
      .dispatch({
        type: "task/delTask",
        payload: item.item.id
      })
      .then(() => {
        message.success("删除成功");
        this.props.dispatch({
          type: "task/getAllTask",
          payload: {
            page: this.state.current,
            type: this.state.taskType,
            status: this.state.taskStatus
          }
        });
        this.props.dispatch({
          type: "task/getCount"
        });
        this.props.dispatch({
          type: "task/getTotalTask",
          payload: {
            type: this.state.taskType,
            status: this.state.taskStatus
          }
        });
      });
  };
  addTask = () => {
    this.setState({
      visible: true
    });
    this.props.form.setFieldsValue({
      title: "",
      type: "",
      date: "",
      desc: ""
    });
  };
  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        });
        this.props
          .dispatch({
            type: "task/newTask",
            payload: {
              task_title: values.title,
              task_desc: values.desc,
              task_type: values.type,
              start_date: values.date[0].format("YYYY-MM-DD hh:mm:ss"),
              hope_finish: values.date[1].format("YYYY-MM-DD hh:mm:ss")
            }
          })
          .then(() => {
            message.success("新增成功");
            this.setState({
              visible: false,
              confirmLoading: false,
              current: 1
            });
            this.props.dispatch({
              type: "task/getAllTask",
              payload: {
                page: 1,
                type: this.state.taskType,
                status: this.state.taskStatus
              }
            });
            this.props.dispatch({
              type: "task/getCount"
            });
            this.props.dispatch({
              type: "task/getTotalTask",
              payload: {
                type: this.state.taskType,
                status: this.state.taskStatus
              }
            });
          });
      }
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { task: { allTask, count, totalTask }, loading } = this.props;
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}个任务</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="" onChange={this.changeType}>
          <RadioButton value="">全部</RadioButton>
          <RadioButton value="work">工作</RadioButton>
          <RadioButton value="my">个人</RadioButton>
        </RadioGroup>
        <Select defaultValue="" onChange={this.changeStatus}>
          <Option value="">全部</Option>
          <Option value="0">进行中</Option>
          <Option value="1">已完成</Option>
          <Option value="2">已过期</Option>
        </Select>
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
      total: totalTask,
      current: this.state.current,
      onChange: page => {
        this.setState({
          current: page
        });
        this.props.dispatch({
          type: "task/getAllTask",
          payload: {
            page: page,
            type: this.state.taskType
          }
        });
      }
    };
    const StatusTitle = ({
      data: { status, href, task_title, hope_finish }
    }) => {
      if (status == "1") {
        return (
          <a href={href}>
            <Icon
              type="smile-o"
              style={{ fontSize: 20, marginRight: 10, color: "#7FFF00" }}
            />
            {task_title}
          </a>
        );
      } else if (status == "0") {
        const datetime = moment().format();
        if (moment(datetime).isAfter(hope_finish)) {
          return (
            <a href={href}>
              <Icon
                type="frown-o"
                style={{ fontSize: 20, marginRight: 10, color: "#E4393C" }}
              />
              {task_title}
            </a>
          );
        } else {
          return (
            <a href={href}>
              <Icon
                type="meh-o"
                style={{ fontSize: 20, marginRight: 10, color: "#08c" }}
              />
              {task_title}
            </a>
          );
        }
      }
    };
    const ListContent = ({
      data: { type, task_type, hope_finish, start_date }
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(start_date).format("YYYY-MM-DD HH:mm")}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>截止时间</span>
          <p>{moment(hope_finish).format("YYYY-MM-DD HH:mm")}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>类型</span>
          <p>{type}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <Modal
          title="任务新增"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem
              label="任务名称"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请填写任务名称!" }]
              })(
                <Input
                  prefix={
                    <Icon type="tags-o" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="填写标签名称"
                />
              )}
            </FormItem>

            <FormItem
              label="任务类型"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "请选择任务类型" }]
              })(
                <Select>
                  <Option value="work">工作</Option>
                  <Option value="my">个人</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="任务周期"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("date", {
                rules: [{ required: true, message: "请选择任务周期" }]
              })(
                <RangePicker
                  disabledDate={this.disabledDate}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                      moment("00:00:00", "HH:mm:ss"),
                      moment("11:59:59", "HH:mm:ss")
                    ]
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
            <FormItem
              label="任务描述"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("desc")(
                <TextArea autosize={{ minRows: 3 }} />
              )}
            </FormItem>
          </Form>
        </Modal>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="本周待办任务" value={count.weekTodo} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周全部任务" value={count.weekAll} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="延滞任务" value={count.expire} />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="任务列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: "0 32px 40px 32px" }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: "100%", marginBottom: 8 }}
              icon="plus"
              onClick={this.addTask}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={allTask}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={this.doneTask.bind(this, { item })}>完成</a>,
                    <a onClick={this.delTask.bind(this, { item })}>删除</a>
                  ]}
                >
                  <List.Item.Meta
                    title={<StatusTitle data={item} />}
                    description={item.task_desc}
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
const TaskManage = Form.create()(TaskList);
export default TaskManage;
