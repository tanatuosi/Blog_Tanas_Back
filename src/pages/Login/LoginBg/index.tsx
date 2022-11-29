

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import s from './index.module.scss';

interface Props {

}

const LoginBg: React.FC<Props> = (props:Props) => {

  const startRef = React.useRef<HTMLDivElement | null>(null);

  const data = {
    statrsCount:900,//星星数量
    distance:1000,//间距
  }

  let datastars: { speed: number; thisDistance: number; }[] = [];

  const starcanvas = () => {
    let i = 0;
    while(i++ < data.statrsCount){
      datastars.push({
        speed: 0.1 + (Math.random() * 1),
        thisDistance: data.distance + (Math.random() * 300),
      })
    }
  }
  starcanvas();

  const listItems = datastars.map((number,index) =>
    <div key={index} className={s.star} style={{transformOrigin: `0 0 ${number.thisDistance}px` ,transform: `translate3d(0,0,-${number.thisDistance}px) rotateY(${(Math.random() * 360)}deg) 
    rotateX(${(Math.random() * -50)}deg) scale(${number.speed},${number.speed})` }}></div>
  );
  console.log(listItems[0]);

  useEffect(() => {
  }, []);

  return (
    <>
      <div ref={startRef} className={s.stars}>
          {listItems}
      </div>
    </>
  );
};

export default connect(() => ({}), {})(LoginBg);
