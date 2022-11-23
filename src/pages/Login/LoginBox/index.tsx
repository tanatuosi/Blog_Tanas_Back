
import React, { useState, useEffect } from 'react';
import cloudbase from '@cloudbase/js-sdk';
import { setLogin } from '../../../redux/actions';
import { connect } from 'react-redux';
import { app } from '../../../utils/cloudBase';
import { Button, Input } from 'antd';
import {
  UserOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import s from './index.module.scss';

interface Props {
}

const LoginBox: React.FC<Props> = (props) => {

  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const login = () => {
    app.auth({ persistence: 'local' })
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        setLogin(true);
      // 发送验证邮件成功
      });
  }


  useEffect(() => {

  }, []);

  return (
    <>
      <div className={s.login}>
        <div className={s.loginbox}>
          <Input className={s.useemail} placeholder="input email" prefix={<UserOutlined />} />
          <Input.Password className={s.usepwd} placeholder="input password" prefix={<SettingOutlined />} />
        </div>
        <div className={s.loginbutton}>
          <Button className={s.visitorloginin}>游客登录</Button>
          <Button className={s.managerloginin}>登录</Button>   
        </div>
      </div>
    </>
  );
};

export default connect(() => ({}), {})(LoginBox);
