import { useMount, useSafeState, useTitle } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import { setNavShow } from '../../redux/actions';
import { siteTitle } from '../../utils/constant';
import useTop from '../../utils/hooks/useTop';


import s from './index.module.scss';
import Section from './Section';

interface Props {
  setNavShow?: Function;
}

const getPoem = require('jinrishici');

const Home: React.FC<Props> = ({ setNavShow }) => {
  useTitle(siteTitle);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  setNavShow && useTop(setNavShow);

  return (
    <>
      <div className={s.body}>
        <Section />
        {/* <Aside /> */}
      </div>
    </>
  );
};

export default connect(() => ({}), { setNavShow })(Home);
