//http://open.iciba.com/dsapi
import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import numeral from "numeral";
import { Link } from "dva/router";
import { Tabs, Row, Col, Card, List, Avatar } from "antd";
const TabPane = Tabs.TabPane;

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import EditableLinkGroup from "../../components/EditableLinkGroup";
import { Radar } from "../../components/Charts";

import styles from "./Workplace.less";
// 代码中写死
const links = [
  {
    title: "写博客",
    href: "../../blog/new"
  },
  {
    title: "改博文",
    href: "../../blog/manage"
  },
  {
    title: "草稿箱",
    href: "../../blog/draft"
  },
  {
    title: "操作四",
    href: ""
  },
  {
    title: "操作五",
    href: ""
  },
  {
    title: "操作六",
    href: ""
  }
];
// 数据表中读取
const members = [
  {
    id: "1",
    title: "沃行",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    link: ""
  },
  {
    id: "2",
    title: "博客系统",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
    link: ""
  },
  {
    id: "3",
    title: "智能运维",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
    link: ""
  },
  {
    id: "4",
    title: "小程序",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
    link: ""
  },
  {
    id: "5",
    title: "快速开发",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
    link: ""
  },
  {
    id: "6",
    title: "沃扫码",
    logo: "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
    link: ""
  }
];

@connect(({ remainder, task, chart, loading }) => ({
  remainder,
  chart,
  task,
  remainderLoading: loading.effects["remainder/getRemainderWeek"],
  todoLoading: loading.effects["task/getTodo"]
}))
export default class Workplace extends PureComponent {
  state = {
    workTask: [
      {
        id: "1",
        title: "扫码节活动链接",
        desc:
          "在沃扫码首页添加“扫码节”活动图标及banner图，链接到扫码节活动页面（电商提供）"
      },
      {
        id: "2",
        title: "打点定位",
        desc:
          "在页面增加手机定位功能，对于开启定位的用户落下定位的数据，以便后续的数据分析"
      },
      {
        id: "3",
        title: "扫码节活动链接",
        desc:
          "在沃扫码首页添加“扫码节”活动图标及banner图，链接到扫码节活动页面（电商提供）"
      },
      {
        id: "4",
        title: "打点定位",
        desc:
          "在页面增加手机定位功能，对于开启定位的用户落下定位的数据，以便后续的数据分析"
      },
      {
        id: "5",
        title: "打点定位",
        desc: "在页面增加手机定位功能，以便后续的数据分析"
      },
      {
        id: "6",
        title: "打点定位",
        desc: "在页面增加手机定位功能，以便后续的数据分析"
      }
    ],
    myTask: [
      {
        id: "1",
        title: "左侧菜单栏动态获取",
        desc: "完成GMS左侧菜单栏的动态获取"
      },
      {
        id: "2",
        title: "Node openCV",
        desc: "使用nodejs做计算机视觉处理，在node中应用openCV"
      },
      {
        id: "3",
        title: "Cycle.js深入",
        desc: "使用Cycle.js构建一个响应式应用"
      },
      {
        id: "4",
        title: "每日健身",
        desc: "每日完成一次健身，时长15-20分钟"
      }
    ]
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "task/getTodoTask"
    });
    dispatch({
      type: "remainder/getRemainderWeek"
    });
    dispatch({
      type: "chart/fetch"
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "chart/clear"
    });
  }

  renderRemainders() {
    const { remainder: { remainderWeek } } = this.props;
    return remainderWeek.map((item, index) => {
      return (
        <List.Item
          key={item.id}
          className={styles.remainderList}
          extra={
            <div
              style={{
                height: 15,
                width: 15,
                borderRadius: 15,
                backgroundColor: item.color
              }}
            />
          }
        >
          <List.Item.Meta
            title={
              <span>
                <a className={styles.username}>
                  {index + 1}.{item.content}
                </a>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.date}>
                {item.date} |{" "}
                {moment(item.date, "YYYY/MM/DD hh:mm:ss").fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      task: { todoTask },
      todoLoading,
      remainderLoading,
      chart: { radarData }
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="static/avatar.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            {new Date().getMonth() + 1}月{new Date().getDate()}日 &nbsp; Hello
            Gatinul
          </div>
          <div>前端开发 | No safe wading in an unknown water.</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>7</p>
        </div>
        <div className={styles.statItem}>
          <p>月任务完成度</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>博客访问</p>
          <p>{numeral(1201).format("0,0")}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="待办任务"
              bordered={false}
              extra={<Link to="/">全部任务</Link>}
              loading={todoLoading}
              bodyStyle={{ padding: 0 }}
            >
              <Tabs
                tabPosition="bottom"
                tabBarStyle={{ paddingLeft: 24, paddingRight: 24 }}
              >
                <TabPane className={styles.tabPane} tab="工作" key="1">
                  <List
                    dataSource={this.state.workTask}
                    renderItem={(item, index) => (
                      <List.Item key={item.id} className={styles.taskList}>
                        <List.Item.Meta
                          title={
                            <a href="https://ant.design">
                              {index + 1}.{item.title}
                            </a>
                          }
                          description={item.desc}
                        />
                        <div>
                          <a>完成</a>
                        </div>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane className={styles.tabPane} tab="个人" key="2">
                  <List
                    dataSource={this.state.myTask}
                    renderItem={(item, index) => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          title={
                            <a href="https://ant.design">
                              {index + 1}.{item.title}
                            </a>
                          }
                          description={item.desc}
                        />
                        <div>
                          <a>完成</a>
                        </div>
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="提醒事项"
              loading={remainderLoading}
            >
              <List loading={remainderLoading} size="large">
                <div className={styles.activitiesList}>
                  {this.renderRemainders()}
                </div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup links={links} linkElement={Link} />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="消费指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="项目"
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {members.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.link}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.title}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
