import { useSafeState } from 'ahooks';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react';
import { storeState } from '../../redux/interface';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { Select, Button, Space, Table, Tag, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { db } from '../../utils/cloudBase';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import s from './index.module.scss';

interface Props {
}

const Tagsmanage: React.FC<Props> = () => {

  const [category, setCategory] = useState<string[]>();
  const [tags, setTagsData] = useState<string[]>();
  const [selectcategory, setSelectcategory] = useState<string>();
  const [selecttags, setSelectTagsData] = useState<string>();

  const getNewCategory = () => {
    db.collection('category')
        .limit(1000)
        .get()
        .then(res => {
          console.log(res);
          getCategoryData(res.data);
        });
  };

  const getNewTagas = () => {
    db.collection('tags')
        .limit(1000)
        .get()
        .then(res => {
          console.log(res);
          getTagsData(res.data);
        });
  };

  const getCategoryData = (result:any[]) => {
    let classesData = [];
    for(let i = 0 ; i < result.length ; i++ ){
      classesData.push(
        result[i].name
      )
    }
    setCategory(classesData);
  }
  
  const getTagsData = (result:any[]) => {
    let tagsData = [];
    for(let i = 0 ; i < result.length ; i++ ){
      tagsData.push(
        result[i].name
      )
    }
    setTagsData(tagsData);
  }

  const addcategory = () => {

  }

  const addtags = () => {

  }


  useEffect(() => {
    getNewCategory();
    getNewTagas();
  },[])

  return (
    <>
      <div className={s.body}>
        <div className={s.content}>
            <div className={s.selectarea}>
              <div className={s.selectcategory}>
                <Input placeholder="input a category " allowClear onChange={addcategory} />
                {
                  category && category.map((item, index) => {
                  return (<Tag key={index}>{item}</Tag>);
                })
                }
              </div>
              <div className={s.selecttags}>
                <Input placeholder="input a tag " allowClear onChange={addtags} />
                {
                  tags && tags.map((item, index) => {
                    return (<Tag key={index}>{item}</Tag>);
                  })
                }  
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default connect(
  () => ({
  }),
{}
)(Tagsmanage);
