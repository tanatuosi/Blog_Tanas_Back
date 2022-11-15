import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Radio, Select, SelectProps, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import s from './index.module.scss';
import { tagsdata } from './constant';

// const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

interface Props {
  className?: string;
  onChange?: (v: string) => void;
}

const children: React.ReactNode[] = [];

const options: SelectProps['options'] = [];
for (let i = 0; i < tagsdata.length; i++) {
  options.push({
    value: tagsdata[i].color,
    label: tagsdata[i].name,
  });
}

const TagSelect: React.FC<Props> = ({ className, onChange }) => {


  return (
    <div className={classNames(s.box, className)}>
      <div className={s.select}>
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={options}
        />
      </div>
    </div>
  );
};

export default TagSelect;
