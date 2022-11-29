import React from 'react';
import s from './index.module.scss';
import { Avatar, Badge } from 'antd';
import {
    useEventListener,
    useLocalStorageState,
    useSafeState,
    useUpdateEffect
  } from 'ahooks';
import {
    BgColorsOutlined,
    SettingOutlined,
    HomeOutlined,
    UserOutlined 
  } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setMode, setNavShow, setLogin } from '../../redux/actions';
import { storeState } from '../../redux/interface';
import { modeMap, modeMapArr } from '../../utils/modeMap';
import { useLinkList } from './config';
import classNames from 'classnames';

interface Props {
    navShow?: boolean;
    setNavShow?: Function;
    mode?: number;
    setMode?: Function;
    setLogin: Function;
  }

  const bodyStyle = window.document.getElementsByTagName('body')[0].style;

//文章 创作 日志 关于 主题切换 搜索功能 后台
const Nav: React.FC<Props> = ({ navShow, setNavShow, mode, setMode, setLogin }) => {
    const navigate = useNavigate();
    const [_, setLocalMode] = useLocalStorageState('localMode');
    const { navArr, secondNavArr } = useLinkList();

    const modeOptions = ['rgb(19, 38, 36)', 'rgb(110, 180, 214)', 'rgb(171, 194, 208)'];

    const exitUser = () => {
      // 清空本地数据
      localStorage.clear();
      // 改变登录状态
      setLogin(false);
    }

    useEventListener(
        'mousewheel',
        event => {
          event = event || window.event;
          setNavShow!(event.wheelDeltaY > 0);
        },
        { target: document.body }
      );

    useUpdateEffect(() => {
    setLocalMode(mode);
    for (const type of modeMapArr) {
        bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][mode!]);
    }
    }, [mode]);

    return (
        <div>
        <nav className={s.Nav}>
            <div className={s.left_content}>
                <div className={s.homeBtn} onClick={() => navigate('/')}>
                    <HomeOutlined />
                </div>
            </div>
            <div className={s.right_content}>
                <div className={s.homeBtn} onClick={() => navigate('/user')}>
                    <Avatar shape="square" icon={<UserOutlined />} />
                </div>
                <div onClick={exitUser} className={s.nametext1}>
                    {'Tanas'}
                </div>
                <div className={s.nametext2}>
                    {'晚上好：'}
                </div>
                
            </div>
        </nav>
        </div>
    )
}

export default connect(
    (state: storeState) => ({
      navShow: state.navShow,
      mode: state.mode
    }),
    { setNavShow, setMode, setLogin }
  )(Nav);