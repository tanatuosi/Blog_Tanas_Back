import { useSafeState } from 'ahooks';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react';
import { storeState } from '../../redux/interface';
import { Select } from 'antd';
import { db } from '../../utils/cloudBase';
import { connect } from 'react-redux';
import { setArtSum } from '../../redux/actions';

import s from './index.module.scss';

interface Props {
  artSum: any;
  setArtSum: Function;
}

interface articlesTitle {
  value: string;
  label: string;
}

const Postmanage: React.FC<Props> = ({ artSum, setArtSum }) => {

  const [page, setPage] = useSafeState(1);
  const [postData, setPostData] = useState<any>();
  const [tagsData, setTagsData] = useState<any>();
  const [articles, setArticles] = useState<articlesTitle[]>();
  const getNewArticles = () => {
    db.collection('articles')
        .limit(1000)
        .get()
        .then(res => {
          console.log(res);
          getData(res.data);
        });
  };

  const getData = (result:any[]) => {
    setPostData(result);
    let articlesData = [];
    for(let i = 0 ; i < result.length ; i++ ){
      articlesData.push(
        {
          value: result[i].title,
          label: result[i].title
        }
      )
    }
    setArticles(articlesData);
  }

  useEffect(() => {
    getNewArticles();
  },[])

  // const { data, loading } = useRequest(
  //   () =>
  //     getPageData({
  //       dbName: DB.Article,
  //       sortKey: 'date',
  //       isAsc: false,
  //       page,
  //       size: homeSize
  //     }),
  //   {
  //     retryCount: 3,
  //     refreshDeps: [page],
  //     cacheKey: `Section-${DB.Article}-${page}`,
  //     staleTime
  //   }
  // );

  return (
    <>
      <div className={s.body}>
        <div className={s.content}>
          <div className={s.selectarea}>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={() => {

              }}
              options={articles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(
  (state: storeState) => ({
    artSum: state.artSum
  }),
{ setArtSum }
)(Postmanage);
