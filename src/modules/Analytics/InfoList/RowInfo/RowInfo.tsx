import React from 'react';
import style from './RowInfo.module.css';

type RowInfoPropsType = {
  value: number | string;
  title: string;
  type?: 'column' | 'row';
};

const RowInfo: React.FC<RowInfoPropsType> = ({
  value,
  title,
  type = 'row',
}) => {
  return (
    <div className={type === 'row' ? style.row : style.column}>
      <div className={style.value}>
        {Number(value) ? Math.trunc(Number(value)) : value}
      </div>
      <div className={style.title}>{title}</div>
    </div>
  );
};

export default RowInfo;
