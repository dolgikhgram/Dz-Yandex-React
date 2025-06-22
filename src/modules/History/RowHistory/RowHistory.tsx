import React from 'react';
import style from './RowHistory.module.css';
import Basket from '../../common/ButtonCollection/Basket/Basket.tsx';
import { useStore } from '../../../Store/Store.tsx';
const key = 'Analytics_Key';

type HistoryItem = {
  name: string;
  date: string;
  processed: boolean;
  // Аналитические данные
  rows_affected?: number;
  total_spend_galactic?: string;
  less_spent_civ?: string;
  big_spent_civ?: string;
  less_spent_value?: number;
  average_spend_galactic?: string;
  less_spent_at?: number;
  big_spent_at?: number;
};

type RowHistoryPropsType = {
  name: string;
  date: string;
  processed: boolean;
  id: string;
  setState: (value: Record<string, HistoryItem>) => void;
  onClick: (id: string) => void;
};

const RowHistory: React.FC<RowHistoryPropsType> = ({
  name,
  date,
  processed,
  id,
  setState,
  onClick,
}) => {
  const { tableData, deleteItem } = useStore();
  const deleteHistory = () => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const newHistorys = JSON.parse(storedData);
      delete newHistorys[id];
      deleteItem(id);
      console.log(tableData);
      localStorage.setItem(key, JSON.stringify(newHistorys));
      setState(newHistorys);
    }
  };
  return (
    <div className={style.rowHistoryContainer}>
      <div
        className={
          processed ? style.activeRowHistory : style.unActiveRowHistory
        }
        onClick={processed ? () => onClick(id) : () => {}}
      >
        <div className={style.fileContainer}>
          <img src={'./iconsfile.svg'} alt={'icon file'} />
          <div className={style.fileText}>{name}</div>
        </div>
        <div className={style.data}>{date}</div>
        <div
          className={
            processed ? style.handlerContainer : style.unHandlerContainer
          }
        >
          <div className={style.handlerText}>Обработан успешно</div>
          <img src={'./Smile.svg'} alt={'smile'} />
        </div>
        <div
          className={
            !processed ? style.handlerContainer : style.unHandlerContainer
          }
        >
          <div className={style.handlerText}>Не удалось обработать</div>
          <img src={'./unsmile.svg'} alt={'unsmile'} />
        </div>
      </div>
      <Basket onClick={deleteHistory} />
    </div>
  );
};

export default RowHistory;
