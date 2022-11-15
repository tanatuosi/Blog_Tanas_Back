import { db } from '../../../utils/cloudBase';
import { useRequest, useSafeState } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MyPagination from '../../../components/MyPagination';
import { storeState } from '../../../redux/interface';
import { DB } from '../../../utils/apis/dbConfig';
import { getPageData } from '../../../utils/apis/getPageData';
import { homeSize, staleTime } from '../../../utils/constant';

import s from './index.module.scss';
import PostCard from './PostCard';

interface theAtc {
  category: string;
  content: string;
  date: object;
  tags: string[];
  title: string;
  titleEng: string;
  url: string;
  imgurl: string;
  _id: string;
  _openid: string;
}

interface Props {
  artSum?: number;
}

const Section: React.FC<Props> = ({ artSum }) => {
  const navigate = useNavigate();
  const [page, setPage] = useSafeState(1);

  const { data, loading } = useRequest(
    () =>
      getPageData({
        dbName: DB.Article,
        sortKey: 'date',
        isAsc: false,
        page,
        size: homeSize
      }),
    {
      retryCount: 3,
      refreshDeps: [page],
      cacheKey: `Section-${DB.Article}-${page}`,
      staleTime
    }
  );

  console.log(data);

  return (
    <section className={s.section}>
      {data?.data.map(({ _id, title, content, date, tags, titleEng, imgurl }: theAtc) => (
        <PostCard
          key={_id}
          title={title}
          content={content}
          date={date}
          tags={tags}
          loading={loading}
          imgurl={imgurl}
          onClick={() => navigate(`/post?title=${encodeURIComponent(titleEng)}`)}
        />
      ))}
      <MyPagination
        current={page}
        defaultPageSize={1}
        total={artSum}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />
    </section>
  );
};

export default connect((state: storeState) => ({ artSum: state.artSum }))(Section);
