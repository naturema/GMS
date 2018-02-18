import React, { PureComponent } from "react";
import { connect } from "dva";
import { Card, Button, Icon, List } from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import Ellipsis from "../../components/Ellipsis";

import styles from "./Tag.less";

@connect(({ blog, loading }) => ({
  blog,
  loading: loading.models.blog
}))
export default class CardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: "blog/getTags"
    });
  }

  render() {
    const { blog: { tagList }, loading } = this.props;

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
                    actions={[<a>编辑</a>, <a>删除</a>]}
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
                  <Button type="dashed" className={styles.newButton}>
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
