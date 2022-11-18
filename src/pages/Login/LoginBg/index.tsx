

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import s from './index.module.scss';

interface Props {

}

const LoginBg: React.FC<Props> = (props:Props) => {

  const data = {
    statrsCount:1800,//星星数量
    distance:1000,//间距
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <div className={s.starts}>
        <div></div>
      </div>
    </>
  );
};

export default connect(() => ({}), {})(LoginBg);
