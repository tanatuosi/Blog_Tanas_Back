
import React, { useState, useEffect } from 'react';
import cloudbase from '@cloudbase/js-sdk';
import { setLogin } from '../../../redux/actions';
import { connect } from 'react-redux';
import s from './index.module.scss';
import { app } from '../../../utils/cloudBase';

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
    </>
  );
};

export default connect(() => ({}), {})(LoginBox);
