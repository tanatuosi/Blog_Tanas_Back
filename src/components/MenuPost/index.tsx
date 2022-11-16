import { Menu, MenuProps, Skeleton } from 'antd';
import classNames from 'classnames';
import React, { lazy, MouseEventHandler, ReactNode } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';

import s from './index.module.scss';

const Postwrite = lazy(() => import(/* webpackPrefetch:true */ '../../pages/Postwrite'));

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  className?: string;
  loading?: boolean;
  isStatic?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

const MenuPost: React.FC<Props> = ({ children, className, loading, isStatic, onClick }) => {

  const navigate = useNavigate();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void,
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as MenuItem;
  }
  
  const items: MenuProps['items'] = [
    getItem('首页', 'mainpost', <SettingOutlined />, () => {navigate('/')}),
    
    getItem('文章改写', 'postwrite', <MailOutlined />, () => {navigate('/postwrite')}),
  
    getItem('文章总览', 'posts', <AppstoreOutlined />, () => {navigate('/posts')}),
  
    getItem('标签管理', 'tags', <SettingOutlined />, () => {navigate('/tags')}),

    getItem('图片管理', 'images', <SettingOutlined />, () => {navigate('/images')}),

    getItem('游戏作品管理', 'games', <SettingOutlined />, () => {navigate('/games')}),

    getItem('计划管理', 'plans', <SettingOutlined />, () => {navigate('/plans')}),

    getItem('用户管理', 'users', <SettingOutlined />, () => {navigate('/users')}),
  ];

  return (
      <Menu className={s.menu} mode="inline" style={{ width: 256 }} items={items} />
  );
};

export default MenuPost;
