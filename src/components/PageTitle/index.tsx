import classNames from 'classnames';
import React, { ReactNode } from 'react';

import s from './index.module.scss';

interface Props {
  title?: string;
  desc?: string;
  className?: string;
  children?: ReactNode;
}

const PageTitle: React.FC<Props> = ({ title, desc, className, children }) => {
  return (
    <div className={classNames(s.box, className)}>
      <div className={s.title}>{title}</div>
      {desc && <div className={s.desc}>{desc}</div>}
      {children}
    </div>
  );
};

export default PageTitle;
