import React from 'react';
import classNames from 'classnames';
import style from './ButtonUpload.module.css';

type ButtonUploadPropsType = {
  type: 'pending' | 'uploaded' | 'process' | 'parsing' | 'done' | 'error';
  children?: string;
  secondaryText?: string;
  onClick?: () => void;
};

const ButtonUpload: React.FC<ButtonUploadPropsType> = ({
  type = 'pending',
  children,
  secondaryText,
  onClick,
}) => {
  const btnType = classNames(
    type === 'pending'
      ? `${style.pendingBtn}`
      : type === 'uploaded'
        ? `${style.uploadedBtn}`
        : type === 'parsing'
          ? `${style.parsingBtn}`
          : type === 'done'
            ? `${style.doneBtn}`
            : type === 'error'
              ? `${style.errorBtn}`
              : type === 'process'
                ? `${style.processBtn}`
                : `${style.pendingBtn}`
  );
  return (
    <div>
      <div className={style.containerBtn}>
        <button className={btnType} onClick={onClick}>
          {(type === 'pending' && (
            <div className={style.pendingText}>{children}</div>
          )) ||
            (type === 'uploaded' && (
              <div className={style.pendingText}>
                <img
                  src={'./loaderBtn.svg'}
                  alt={'loading'}
                  className={style.loaderSpin}
                />
              </div>
            )) ||
            (type === 'done' && (
              <div className={style.pendingText}>{children}</div>
            )) ||
            (type === 'process' && (
              <div className={style.pendingText}>{children}</div>
            )) ||
            (type === 'error' && (
              <div className={style.errorText}>{children}</div>
            ))}
        </button>
        {(type === 'done' && (
          <button onClick={onClick} className={style.x}>
            <img src={'./x.svg'} alt={'X'} />
          </button>
        )) ||
          (type === 'process' && (
            <button onClick={onClick} className={style.x}>
              <img src={'./x.svg'} alt={'X'} />
            </button>
          )) ||
          (type === 'error' && (
            <button onClick={onClick} className={style.x}>
              <img src={'./x.svg'} alt={'X'} />
            </button>
          ))}
        <div></div>
      </div>
      {(type === 'pending' && (
        <div className={style.textSecondary}>{secondaryText}</div>
      )) ||
        (type === 'process' && (
          <div className={style.textSecondary}>{secondaryText}</div>
        )) ||
        (type === 'uploaded' && (
          <div className={style.textSecondary}>{secondaryText}</div>
        )) ||
        (type === 'parsing' && (
          <div className={style.textSecondary}>{secondaryText}</div>
        )) ||
        (type === 'done' && (
          <div className={style.textSecondary}>{secondaryText}</div>
        )) ||
        (type === 'error' && (
          <div className={style.textErrorSecondary}>{secondaryText}</div>
        ))}
    </div>
  );
};

export default ButtonUpload;
