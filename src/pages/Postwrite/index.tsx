// import { useMount, useSafeState, useTitle } from 'ahooks';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import React, { useState, useEffect } from 'react';
import TagSelect from '../../components/TagSelect';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Input } from 'antd';
import type { UploadProps } from 'antd';

import { connect } from 'react-redux';
import { setNavShow } from '../../redux/actions';
import useTop from '../../utils/hooks/useTop';


import s from './index.module.scss';

interface Props {

}
const { TextArea } = Input;

const Postwrite: React.FC<Props> = (props:Props) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  setNavShow && useTop(setNavShow);

  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('<p>hello</p>');

  useEffect(() => {
    setTimeout(() => {
        setHtml('<p>hello world</p>')
    }, 1500)
  }, []);

  const propsUpload: UploadProps = {
    beforeUpload: file => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: info => {
      console.log(info.fileList);
    },
  };

  const toolbarConfig: Partial<IToolbarConfig> = { } ;
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    };
  
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
        if (editor == null) return
        editor.destroy()
        setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div className={s.body}>
        <div className={s.content}>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '800px', overflowY: 'hidden' }}
                    // style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div className={s.details}>
              <div className={s.title}>
                <div>{'英文标题：'+' '}</div>
                <TextArea className={s.title_textarea} placeholder="请输入标题" />
              </div>
              <div className={s.coverdescrible}>
                <div>封面及摘要：</div>
                <div className={s.covercontent}>
                  <div className={s.cover}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      className="upload-list-inline"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </div>
                  <div className={s.describle}>
                    <TextArea className={s.describletextarea} placeholder="请输入摘要">
                    </TextArea>
                  </div>
                </div>
                
              </div>
              <div className={s.tags}>
                <div>标签：</div>
                <TagSelect className={s.tagsselect} />
              </div>
              <div className={s.tags}>
                <div>分类：</div>
                <TagSelect className={s.tagsselect} />
              </div>
              <div className={s.tags}>
                <div>权限：</div>
                <TagSelect className={s.tagsselect} />
              </div>
            </div>
        </div>
            <div className={s.confirm}>
              <Button className={s.save}>
                保存草稿
              </Button>
              <Button className={s.post}>
                读取草稿
              </Button>
              <Button className={s.post}>
                发布
              </Button>
            </div>
      </div>
    </>
  );
};

export default connect(() => ({}), {})(Postwrite);
