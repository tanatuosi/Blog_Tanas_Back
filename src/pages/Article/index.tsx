import { connect } from 'react-redux';
import { message, Select, notification } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';
import { visitorText } from '../../utils/constant';
import { storeState } from '../../redux/interface';
import { db } from '../../utils/cloudBase'
import s from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
}

const Article: React.FC<Props> = () => {
    const navigate = useNavigate();

        // ———————————标题、时间———————————————
    const [title, setTitle] = useState('');
    const [titleEng, setTitleEng] = useState('');
    const [date, setDate] = useState('');

        // ——————————标签————————————
    // 已选的标签
    const [selectTags, setSelectTags] = useState([]);

        // ——————————分类————————————
    // 已选的分类
    const [selectClasses, setSelectClasses] = useState('');
    const [defaultClasses, setDefaultClasses] = useState('');

        // ————————————正文———————————
    // 编辑区文字
    const [defaultContent, setDefaultContent] = useState('');
    const [content, setContent] = useState('');

    interface titleSelectinterface {
        label: String;
        value: Number;
    }

    interface tagsSelectinterface {
        label: String;
        value: Number;
    }

    interface classSelectinterface {
        label: String;
        value: Number;
    }

    //title列表
    const titleOptiion:titleSelectinterface[] = [];

    //tags列表
    const tagsOptiion:tagsSelectinterface[] = [];

    //title列表
    const classOptiion:classSelectinterface[] = [];

    //获取title列表
    const getTiltleOption = (artTitle: any) => {
        for(let i = 0 ; i < artTitle.length ; i++){
            titleOptiion[i] = {
                label: artTitle[i].title,
                value: artTitle[i].id
            }  
        }
    }

    //获取title列表 这里只是暂时这么写，后面需要补充
    const getTagsOption = (artTitle: any) => {
        for(let i = 0 ; i < artTitle.length ; i++){
            tagsOptiion[i] = {
                label: artTitle[i].tags,
                value: artTitle[i].tags
            }  
        }
    }

    //获取title列表，这里只是暂时这么写，后面需要补充
    const getClassOption = (artTitle: any) => {
        for(let i = 0 ; i < artTitle.length ; i++){
            classOptiion[i] = {
                label: artTitle[i].title,
                value: artTitle[i].title
            }  
        }
    }



    //这里只需要获取文章名字，文章英文名字，文章id就好
    const getArticle = () => {
        db.collection('articles')
        .limit(1000)
        .get()
        .then(res => {
            console.log(res.data)
            getTiltleOption(res.data);
            getTagsOption(res.data);
            getClassOption(res.data);
            console.log(titleOptiion);
        });
    }

    const addArticle = () => {
        const page ='/admin/article';
        const messages = '文章添加成功！';
        const icon =( <CarryOutOutlined style={{ color: 'blue' }} /> );
        db.collection('articles')
            .add({
                title,
                titleEng,
                content: "",
                tags: selectTags,
                categor: selectClasses,
                date: new Date(date).getTime(),
                url: `https://lzxjack.top/post?title=${titleEng}`,
            })
            .then(res => {
                // console.log(res);
                if (res.code && res.code === 'DATABASE_PERMISSION_DENIED') {
                    message.warning(visitorText);
                    return;
                }
                // getArticlesOrDrafts(dbName);
                // 转到草稿页/文章页
                navigate('/postwrite', {
                     state: {   
                        title: title, 
                        titleEng: titleEng, 
                        tags: selectTags,
                        classes: selectClasses,
                        date: new Date(date).getTime(),
                    } 
                });
                // 提示消息
                notification.open({
                    message: messages,
                    placement: 'bottomLeft',
                    icon,
                    duration: 1.5,
                });
            });
    };

    useEffect(() => {
        getArticle();
    }, [])
    return (
        <div className={s.main}>
            <div className={s.header}>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={titleOptiion}
                />
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={tagsOptiion}
                />
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={classOptiion}
                />
            </div>
            <div className={s.body}>
                    
            </div>
            <div />
        </div>
    );
};

export default connect(
    (state: storeState) => ({
    }),
    {  }
  )(Article);
  
