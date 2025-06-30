import React from 'react';
import style from './Button.module.css';
import classNames from 'classnames';

type ButtonPropsType = {
  type: 'active' | 'unactive' | 'download' | 'clear';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonPropsType> = ({
  type = 'unactive',
  children,
  onClick,
  disabled = false,
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
      <button className={btnType} onClick={onClick} disabled={disabled}>
        <div className={btnTextType}>{children}</div>
      </button>
    </div>
  );
};

export default Button;
