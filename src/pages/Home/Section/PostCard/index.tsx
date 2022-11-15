// import dayjs from 'dayjs';
import React, { MouseEventHandler, ReactNode } from 'react';

import Card from '../../../../components/Card';
import { Image } from 'antd';

import s from './index.module.scss';
import PostCardLoading from './PostCardLoading';

interface Props {
  title?: string;
  content?: string;
  date?: object;
  tags?: string[];
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
  imgurl?: string;
}

const PostCard: React.FC<Props> = ({ title, content, imgurl, date, tags, loading, onClick }) => {
  return (
    <Card className={s.card} isStatic={true} onClick={onClick}>
      {loading ? (
        <PostCardLoading />
      ) : (
        <>
          <div className={s.cardcontent}>
            <div className={s.leftcontent}>
              <div className={s.title}>{title}</div>
              <p className={s.content}>
                {content}
              </p>
              <div className={s.info}>
                <span className={s.date}>{100}</span>
                <div className={s.tags}>
                  {tags!.map(tag => (
                    <span className={s.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={s.rightcontent}>
              <Image src={imgurl} width={290}></Image>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default PostCard;
