
import React, { useState, useEffect } from 'react';
import cloudbase from '@cloudbase/js-sdk';
import { setLogin } from '../../../redux/actions';
import { connect } from 'react-redux';
import s from './index.module.scss';
import { app } from '../../../utils/cloudBase';
import { Input } from 'antd';
import {
  UserOutlined 
} from '@ant-design/icons';

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
      <div className={s.lpgin}>
        <Input className={s.useemail} placeholder="default size" prefix={<UserOutlined />} />
        <Input.Password className={s.usepwd} placeholder="input password" />
      </div>
    </>
  );
};

export default connect(() => ({}), {})(LoginBox);
