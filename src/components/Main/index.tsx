import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import s from './index.module.scss';

const Home = lazy(() => import(/* webpackPrefetch:true */ '../../pages/Home'));
const Postwrite = lazy(() => import(/* webpackPrefetch:true */ '../../pages/Postwrite'));
const Postmanage = lazy(() => import(/* webpackPrefetch:true */ '../../pages/Postmanage'));
const Tags = lazy(() => import(/* webpackPrefetch:true */ '../../pages/Tagsmanage'));
// const Tags = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Tags'));
// const Gallery = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Gallery'));
// const Img = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Img'));
// const Say = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Say'));
// const Msg = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Msg'));
// const Link = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Link'));
// const Show = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Show'));
// const Log = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Log'));
// const About = lazy(() => import(/* webpackPrefetch:true */ '@/pages/About'));
// const Post = lazy(() => import(/* webpackPrefetch:true */ '@/pages/Post'));
// const ArtDetail = lazy(() => import(/* webpackPrefetch:true */ '@/pages/ArtDetail'));

const Main: React.FC = () => {
    return (
        <main className={s.main}>
            <Suspense fallback={<></>}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/postwrite' element={<Postwrite />} />
                <Route path='/posts' element={<Postmanage />} />
                <Route path='/tags' element={<Tags />} />
                {/* <Route path='tags' element={<Tags />} />
                <Route path='gallery' element={<Gallery />} />
                <Route path='img' element={<Img />} />
                <Route path='say' element={<Say />} />
                <Route path='msg' element={<Msg />} />
                <Route path='link' element={<Link />} />
                <Route path='show' element={<Show />} />
                <Route path='log' element={<Log />} />
                <Route path='about' element={<About />} />
                <Route path='post' element={<Post />} />
                <Route path='artDetail' element={<ArtDetail />} />
                <Route path='*' element={<Navigate to='/' replace />} /> */}
              </Routes>
            </Suspense>
      </main>
    )
}

export default Main;