import React from 'react';
import style from './Button.module.css';
import classNames from 'classnames';

type ButtonPropsType = {
  type: 'active' | 'unactive' | 'download' | 'clear';
  children?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({
  type = 'unactive',
  children,
  onClick,
}) => {
  const btnType = classNames(
    type === 'unactive'
      ? `${style.unactiveBtn}`
      : type === 'active'
        ? `${style.activeBtn}`
        : type === 'download'
          ? `${style.downloadBtn}`
          : type === 'clear'
            ? `${style.clearBtn}`
            : `${style.unactiveBtn}`
  );
  const btnTextType = classNames(
    type === 'unactive'
      ? `${style.unactiveBtnText}`
      : type === 'active'
        ? `${style.activeBtnText}`
        : type === 'download'
          ? `${style.downloadBtnText}`
          : type === 'clear'
            ? `${style.clearBtnText}`
            : `${style.unactiveBtnText}`
  );
  return (
    <div>
      <button className={btnType} onClick={onClick}>
        <div className={btnTextType}>{children}</div>
      </button>
    </div>
  );
};

export default Button;
