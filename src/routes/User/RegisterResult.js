import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { routerRedux } from "dva/router";
import { Button, Modal } from 'antd';
import { Link } from 'dva/router';
import Result from '../../components/Result';
import styles from './RegisterResult.less';


@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/review'],
}))
export default class Register extends Component {
  review = () => {
    this.props.dispatch({
      type: 'register/review',
      payload: {
        name: localStorage.getItem("antd-pro-authority")
      }
    }).then(()=>{
      const modal = Modal.success({
        title: '提交审核成功！',
        content: '将在3秒后自动关闭',
      });
      routerRedux.push("/user/login")
      setTimeout(() => modal.destroy(), 3000);
    })
  }
  render() {
    return(
      <div>
        <Result
          className={styles.registerResult}
          type="success"
          title={
            <div className={styles.title}>
              你的账户：{localStorage.getItem("antd-pro-authority")} 注册成功
            </div>
          }
          description="注册成功后，需提交审核，方可获得界面权限，请点击下方按钮提交审核，或前往登录页面。"
          actions={<div className={styles.actions}>
            <a onClick={this.review}><Button size="large" type="primary">提交审核</Button></a>
            <Link to="/user/login"><Button size="large">前往登录</Button></Link>
          </div>}
          style={{ marginTop: 56 }}
        />
      </div>
    )

  }
}
