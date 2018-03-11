import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar
} from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./TaskList.less";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task
}))
export default class BasicList extends PureComponent {
  state = {
    current: 1,
    taskType: ""
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
        type: e.target.value
      }
    });
    this.props.dispatch({
      type: "task/getTotalTask",
      payload: {
        type: e.target.value
      }
    });
    this.setState({
      taskType: e.target.value,
      current: 1
    });
  };

  render() {
    const { task: { allTask, count, totalTask }, loading } = this.props;
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
        console.log(page);
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
      data: { type, task_type, hope_finish, create_date }
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>创建时间</span>
          <p>{moment(create_date).format("YYYY-MM-DD HH:mm")}</p>
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
                <List.Item actions={[<a>完成</a>, <a>删除</a>]}>
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
