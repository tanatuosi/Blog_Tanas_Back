// import './global.custom.scss';

import React, { useEffect } from 'react';
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
import MenuPost from './components/MenuPost';
import { setLogin } from './redux/actions';
import Login from './pages/Login'
import { auth } from './utils/cloudBase';



interface Props {
  login?: boolean;
  setLogin: Function;
}

const App: React.FC<Props> = ({ login, setLogin }) => {
  const bgClasses = [styles.bg0, styles.bg1, styles.bg2];

  useEffect(() => {
    auth.hasLoginState() ? setLogin(true) : setLogin(false);
  },[login])

  if( login ){
    return (
      <div className={classNames(styles.AppBox, bgClasses[2])}>
      {/* <div className={classNames(styles.AppBox, bgClasses[mode!])}> */}
        <Nav />
        <div className={styles.main}>
          <MenuPost />
          <Main />
        </div>
        <Footer />
        <BackToTop />
      </div>
    )
  }
  
  return (
    <div>
      <Login />
    </div>
  )
} 

export default connect(
  (state: storeState) => ({
    login: state.login
  }),
  { setLogin }
)(App);
