// import { useMount, useSafeState, useTitle } from 'ahooks';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useLocation } from 'react-router-dom';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { visitorText } from '../../utils/constant';
import { CarryOutOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { db } from '../../utils/cloudBase';
import TagSelect from '../../components/TagSelect';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Input, notification, Modal  } from 'antd';
import type { UploadProps } from 'antd';
import { DatePicker } from '@douyinfe/semi-ui';
 
import { connect } from 'react-redux';
import { setNavShow } from '../../redux/actions';
import useTop from '../../utils/hooks/useTop';


import s from './index.module.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

const { TextArea } = Input;

const Postwrite: React.FC = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  setNavShow && useTop(setNavShow);

  let location = useLocation();
  let server_id = location.state;
  if(server_id === null) server_id = {};
  const {toTitle='', toTitleEng='', toTags=[], toCategory='', toDate='2022-01-01', tocontent= ''} = server_id;

  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState(tocontent);

  const [title, setTitle] = useState(toTitle);
  const [titleEng, setTitleEng] = useState(toTitleEng);
  const [date, setDate] = useState(toDate);

  const [open, setOpen] = useState<boolean>(false);
  const [openprop, setOpenprop] = useState<boolean>(false);

      // ——————————标签————————————
  // 已选的标签
  const [selectTags, setSelectTags] = useState(toTags);

      // ——————————分类————————————
  // 已选的分类
  const [selectCategory, setSelectCategory] = useState(toCategory);
  const [defaultClasses, setDefaultClasses] = useState('');

      // ————————————正文———————————
  // 编辑区文字
  const [defaultContent, setDefaultContent] = useState('');
  // const [content, setContent] = useState('');

  const [permission ,setPermission] = useState('public');

  const addArticle = () => {
    const page ='/admin/article';
    const content = html;
    const messages = '文章添加成功！';
    const icon =( <CarryOutOutlined style={{ color: 'blue' }} /> );
    if( title == '' || titleEng == '' ) return;
    db.collection('articles')
        .add({
            'title': title,
            'titleEng': titleEng,
            'content': content,
            'tags': selectTags,
            'category': selectCategory[0],
            // 'date': new Date(date).getTime(),
            'date': '2022年1月1日',
            'url': `https://localhost:3000/post?title=${titleEng}`,
            'permission': permission,
            'key': titleEng
        })
        .then(res => {
            // console.log(res);
            if (res.code && res.code === 'DATABASE_PERMISSION_DENIED') {
                message.warning(visitorText);
                return;
            }
            // 提示消息
            notification.open({
                message: messages,
                placement: 'bottomLeft',
                icon,
                duration: 1.5,
            });
        });
};

const setotherProps = () => {
  console.log(selectCategory);
  console.log(selectTags);
  console.log(permission);
}

  useEffect(() => {
    // setTimeout(() => {
    //     setHtml('<p>hello world</p>')
    // }, 1500)
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
                    style={{ height: '1100px', overflowY: 'hidden' }}
                    // style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </div>
            <div className={s.confirm}>
              {/* <Button className={s.save}>
                保存草稿
              </Button> */}
              <Button className={s.post} onClick={() => setOpenprop(true)}>
                显示具体配置
              </Button>
              <Button className={s.post} onClick={() => setOpen(true)}>
                发布
              </Button>
            </div>
      </div>
      <Modal
        title="其他配置"
        centered
        open={openprop}
        onOk={() => {setOpenprop(false);}}
        onCancel={() => setOpenprop(false)}
        width={1500}
      >
            <div className={s.details}>
              <div className={classNames(s.title, s.firsttitle)}>
                <div>{'文章标题：'+' '}</div>
                <TextArea value={title} className={s.title_textarea} onChange={(e) => { setTitle(e.target.value)}} placeholder="请输入文章标题" />
              </div>
              <div className={s.title}>
                <div>{'英文标题：'+' '}</div>
                <TextArea value={titleEng} className={s.title_textarea} onChange={(e) => { setTitleEng(e.target.value)}}  placeholder="请输入英语标题" />
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
                <div>分类：</div>
                <TagSelect value={selectCategory} type={'category'} className={s.tagsselect} onChange={(e) => {setSelectCategory(e)}} />
              </div>
              <div className={s.tags}>
                <div>标签：</div>
                <TagSelect value={selectTags} type={'tags'} className={s.tagsselect} onChange={(e) => {setSelectTags(e)}} />
              </div>
              <div className={s.tags}>
                <div>权限：</div>
                <TagSelect value={permission} type={'permission'} className={s.tagsselect} onChange={(e) => {setPermission(e)}} />
              </div>
              <div className={s.tags}>
                <div>日期：</div>
                <DatePicker
                  defaultValue={date} 
                  onChange={ (date, datestring) => {
                    setDate(datestring);
                  }}
                  className={s.datapicker}
                  />
              </div>
            </div>
      </Modal>
      <Modal
        title="是否要添加文章"
        centered
        open={open}
        onOk={() => { addArticle(); setOpen(false);}}
        onCancel={() => setOpen(false)}
        width={500}
      >
        <p>确保标题和英文标题不为空</p>
      </Modal>
    </>
  );
};

export default connect(() => ({}), {})(Postwrite);
