
import React, { useState, useEffect } from 'react';
import cloudbase from '@cloudbase/js-sdk';
import { setLogin } from '../../../redux/actions';
import { connect } from 'react-redux';
import { app } from '../../../utils/cloudBase';
import { Button, Input, notification } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  CheckOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import s from './index.module.scss';

interface Props {
  setLogin: Function;
}

const LoginBox: React.FC<Props> = ( {setLogin} ) => {

  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const openLoginNoti = (state: Boolean) => {
    const message = state ? '登录成功' : '登录失败';
    const description = state
      ? '欢迎进入博客后台管理系统！'
      : '用户名或密码不正确，请重新登录！';
    const icon = state ? (
      <CheckOutlined style={{ color: 'blue' }} />
    ) : (
      <CloseOutlined style={{ color: 'red' }} />
    );
    notification.open({
      message,
      description,
      icon,
      placement: 'bottomLeft',
      duration: 1.5
    });
  };

  const login = () => {
    app.auth({ persistence: 'local' })
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        setLogin(true);
        openLoginNoti(true);
      // 发送验证邮件成功
      })
      .catch(() => {
        // 登录失败
        // setLogin(false);
        setLogin(false);
        openLoginNoti(false);
      });
  }


  useEffect(() => {

  }, []);

  return (
    <>
      <div className={s.login}>
        <div className={s.loginbox}>
          <Input onChange={(e) => {setEmail(e.target.value)}} className={s.useemail} placeholder="input email" prefix={<UserOutlined />} />
          <Input.Password onChange={(e) => {setPwd(e.target.value)}} className={s.usepwd} placeholder="input password" prefix={<SettingOutlined />} />
        </div>
        <div className={s.loginbutton}>
          <Button className={s.visitorloginin}>游客登录</Button>
          <Button onClick={login} className={s.managerloginin}>登录</Button>   
        </div>
      </div>
    </>
  );
};

export default connect(() => ({}), { setLogin })(LoginBox);
