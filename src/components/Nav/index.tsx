import React from 'react';
import s from './index.module.scss';
import {
    useEventListener,
    useLocalStorageState,
    useSafeState,
    useUpdateEffect
  } from 'ahooks';
import {
    BgColorsOutlined,
    SettingOutlined
  } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setMode, setNavShow } from '../../redux/actions';
import { storeState } from '../../redux/interface';
import { modeMap, modeMapArr } from '../../utils/modeMap';
import { useLinkList } from './config';
import classNames from 'classnames';

interface Props {
    navShow?: boolean;
    setNavShow?: Function;
    mode?: number;
    setMode?: Function;
  }

  const bodyStyle = window.document.getElementsByTagName('body')[0].style;

//文章 创作 日志 关于 主题切换 搜索功能 后台
const Nav: React.FC<Props> = ({ navShow, setNavShow, mode, setMode }) => {
    const navigate = useNavigate();
    const [_, setLocalMode] = useLocalStorageState('localMode');
    const { navArr, secondNavArr } = useLinkList();

    const modeOptions = ['rgb(19, 38, 36)', 'rgb(110, 180, 214)', 'rgb(171, 194, 208)'];

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
        <div className={s.outside}>
        <nav className={s.Nav}>
            <div className={s.left_content}>
                <div className={s.mian_image} onClick={() => navigate('/')} />
            </div>
            <div className={s.right_content}>
                <div className={s.homeBtn} onClick={() => navigate('/')}>
                    <SettingOutlined />
                </div>
                <div className={s.modeBtn} onClick={() => navigate('/')}>
                    <BgColorsOutlined />
                    <div className={s.modeOpions}>
                        {modeOptions.map((backgroundColor, index) => (
                            <div 
                            key={index} 
                            style={{backgroundColor: backgroundColor}}
                            className={classNames(s.modeItem, s[`modeItem${index}`])}
                            onClick={() => setMode?.(index)}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.homeBtn} onClick={() => navigate('/')}>
                    建站
                </div>
                <div className={s.homeBtn} onClick={() => navigate('/')}>
                    关于
                </div>
                <div className={s.homeBtn} onClick={() => navigate('/')}>
                    图库
                </div>
                <div className={s.homeBtn} onClick={() => navigate('/postwrite')}>
                    创作
                </div>
                <div className={s.homeBtn} onClick={() => navigate('/')}>
                    文章
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
    { setNavShow, setMode }
  )(Nav);