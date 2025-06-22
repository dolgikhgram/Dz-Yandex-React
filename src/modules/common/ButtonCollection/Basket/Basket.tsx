import style from './Basket.module.css';
import React from 'react';

type BasketPropType = {
  onClick?: () => void;
};

const Basket: React.FC<BasketPropType> = ({ onClick }) => {
  return (
    <div className={style.container} onClick={onClick}>
      <img src={'./basket.svg'} alt='basket icon' />
    </div>
  );
};

export default Basket;
