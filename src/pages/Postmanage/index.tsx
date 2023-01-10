import { useSafeState } from 'ahooks';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react';
import { storeState } from '../../redux/interface';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { Select, Button, Space, Table, Tag, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { db } from '../../utils/cloudBase';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import s from './index.module.scss';

interface DataType {
  title: string;
  titleEng: string;
  category: string;
  tags: string[];
  date: string;
}

interface Props {
}

interface optionsTitle {
  value: string;
  label: string;
}

const Postmanage: React.FC<Props> = () => {

  const columns: ColumnsType<DataType> = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '英语标题',
    dataIndex: 'titleEng',
    key: 'titleEng',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '编辑',
    key: 'action',
    render: (_, record) => (
      <div>
        <Popconfirm title="确定编辑？" onConfirm={() => toPostwrite(record)}>
          <Button style={{ marginRight: 16 }}>编辑</Button>
        </Popconfirm>
        <Popconfirm title="确定删除" onConfirm={() => DeleteBlog(record)}>
          <Button>删除</Button>
        </Popconfirm>
      </div>
    ),
  },
];

  const navigate = useNavigate();

  const [postData, setPostData] = useState<any>();
  const [originPostData, setOriginPostData] = useState<any>();
  const [categoryData, setCategory] = useState<optionsTitle[]>();
  const [tagsData, setTagsData] = useState<optionsTitle[]>();
  const [articlesTitle, setArticlesTitle] = useState<optionsTitle[]>();
  const [selectcategory, setSelectcategory] = useState<string>();
  const [selecttags, setSelectTagsData] = useState<string>();
  const [selectarticlesTitle, setSelectArticlesTitle] = useState<string>();
  const getNewArticles = () => {
    db.collection('articles')
        .limit(1000)
        .get()
        .then(res => {
          console.log(res);
          getTitleData(res.data);
        });
  };

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

  const getTitleData = (result:any[]) => {
    setPostData(result);
    setOriginPostData(result);
    let articlesData = [];
    for(let i = 0 ; i < result.length ; i++ ){
      articlesData.push(
        {
          value: result[i].title,
          label: result[i].title
        }
      )
    }
    setArticlesTitle(articlesData);
  }

  const getCategoryData = (result:any[]) => {
    let classesData = [];
    for(let i = 0 ; i < result.length ; i++ ){
      classesData.push(
        {
          value: result[i].name,
          label: result[i].name
        }
      )
    }
    setCategory(classesData);
  }
  
  const getTagsData = (result:any[]) => {
    let tagsData = [];
    for(let i = 0 ; i < result.length ; i++ ){
      tagsData.push(
        {
          value: result[i].name,
          label: result[i].name
        }
      )
    }
    setTagsData(tagsData);
  }

  const toPostwrite = (record: any) => {
    console.log(record);
    const { title, titleEng, tags, category, date, content } = record;
    navigate('/postwrite', {
      state: { 
         toTitle: title, 
         toTitleEng: titleEng, 
         toTags: tags,
         toCategory: category,
         toDate: date,
         tocontent: content,
     } 
 });
  }

  const DeleteBlog = (title: any) => {
    console.log(title);
  }

  const filterTable = () => {
    setPostData(originPostData.filter( (item: any) => {
        return (!selectarticlesTitle || (selectarticlesTitle && item.title === selectarticlesTitle)) && (!selectcategory || (selectcategory && item.category === selectcategory)) && (!selecttags || (selecttags && item.tags.includes(selecttags)));
    } ))

  }

  useEffect(() => {
    getNewArticles();
    getNewCategory();
    getNewTagas();
  },[])

  return (
    <>
      <div className={s.body}>
        <div className={s.content}>
          <div className={s.main_table}>
            <div className={s.selectarea}>
              <Select
                allowClear
                className={s.selectOption}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                style={{ width: '200px' }}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => {
                  setSelectArticlesTitle(value);
                }}
                options={articlesTitle}
              />
              <Select
                allowClear
                className={s.selectOption}
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                style={{ width: '200px' }}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => {
                  setSelectcategory(value);
                }}
                options={categoryData}
              />
              <Select
                allowClear
                className={s.selectOption}
                showSearch
                placeholder="Select some tags"
                optionFilterProp="children"
                style={{ width: '200px' }}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={(value) => {
                  setSelectTagsData(value);
                }}
                options={tagsData}
              />
              <Button type="primary" icon={<SearchOutlined />} onClick={filterTable}>
                Search
              </Button>
              <Button 
                type="primary" 
                icon={<FileAddOutlined />} 
                style={{ marginLeft: '300px' }} 
                onClick={() => {
                  navigate('/postwrite');
                }}>
                Add
              </Button>
            </div>
            <div className={s.tablearea}>
              <Table columns={columns} dataSource={postData} pagination={{ position: ['bottomCenter'], pageSize: 10 }} />
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
)(Postmanage);
