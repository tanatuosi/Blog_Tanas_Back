// import './global.custom.scss';

import React from 'react';
import styles from './App.module.scss';
import { connect } from 'react-redux';
import { useLocalStorageState, useMount } from 'ahooks';
import { setMode } from './redux/actions';
import { storeState } from './redux/interface';
import classNames from 'classnames';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import 'antd/dist/antd.min.css';



interface Props {
  mode?: number;
  setMode?: Function;
}

const App: React.FC<Props> = ({ mode, setMode }) => {
  const bgClasses = [styles.bg0, styles.bg1, styles.bg2];
  const [localMode] = useLocalStorageState('localMode');

  useMount(() => {
    if (localMode !== undefined) {
      setMode?.(localMode);
    }
  });
  
  return (
    <div className={classNames(styles.AppBox, bgClasses[0])}>
    {/* <div className={classNames(styles.AppBox, bgClasses[mode!])}> */}
      <Nav />
      <Main />
      <Footer />
      <BackToTop />
    </div>
  )
} 

export default connect(
  (state: storeState) => ({
    mode: state.mode
  }),
  { setMode }
)(App);
