import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Radio, Select, SelectProps, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { db } from '../../utils/cloudBase';

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
      color="magenta"
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
  type?: string;
  value?: string | string[];
  className?: string;
  onChange: (e: any) => void;
}

const children: React.ReactNode[] = [];

const TagSelect: React.FC<Props> = ({ type, className, onChange, value }) => {

  const [categoryData, setCategory] = useState<SelectProps['options']>();
  const [tagsData, setTagsData] = useState<SelectProps['options']>();
  const optionspermisson: SelectProps['options'] = [
  {
    'value': 'public',
    'label': 'public',
    'key' : 1,
  },
  {
    'value': 'admin',
    'label': 'admin',
    'key' : 2,
  },
  {
    'value': 'creater',
    'label': 'creater',
    'key' : 3,
  }
];

const getNewCategory = () => {
  db.collection('category')
      .limit(1000)
      .get()
      .then(res => {
        getCategoryData(res.data);
      });
};

const getCategoryData = (result:any[]) => {
  const optionsCategory = [];
  for(let i = 0 ; i < result.length ; i++ ){
    optionsCategory.push(
      {
        value: result[i].name,
        label: result[i].name,
        key : i,
      }
    )
  }
  setCategory(optionsCategory);
}

const getNewTagas = () => {
  db.collection('tags')
      .limit(1000)
      .get()
      .then(res => {
        getTagsData(res.data);
      });
};

const getTagsData = (result:any[]) => {
  const optionsTags = [];
  for(let i = 0 ; i < result.length ; i++ ){
    optionsTags.push(
      {
        value: result[i].name,
        label: result[i].name,
        key : i,
      }
    )
  }
  setTagsData(optionsTags);
}

  useEffect(() => {
    getNewCategory();
    getNewTagas();
  },[])

  return (
    <div className={classNames(s.box, className)}>
      <div className={s.select}>
      {
        type === 'category' || type === 'permission' ?
          <Select
            showArrow
            value={value}
            tagRender={tagRender}
            style={{ width: '100%' }}
            options={
              type === 'category' 
                ? categoryData
                : optionspermisson
              } 
            onChange={(value) => {
              onChange(value);
            }}
          />
        :
          <Select
            mode="multiple"
            value={value}
            showArrow
            tagRender={tagRender}
            style={{ width: '100%' }}
            options={tagsData} 
            onChange={(value) => {
              onChange(value);
            }}
          />
      }
      </div>
    </div>
  );
};

export default TagSelect;
