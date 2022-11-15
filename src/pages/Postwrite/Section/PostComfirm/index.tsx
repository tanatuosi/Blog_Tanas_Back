import { Button } from 'antd';
import React from 'react';

import s from './index.module.scss';

const addPost = () =>{
  console.log(1);
}

const PostComfirm: React.FC = () => {
  return (
    <div className={s.postCardLoading}>
      <Button className={s.save} onClick={addPost}>
        保存草稿
      </Button>
    </div>
  );
};

export default PostComfirm;
