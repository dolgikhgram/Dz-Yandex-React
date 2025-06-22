import React from 'react';
import style from './InfoList.module.css';
import RowInfo from './RowInfo/RowInfo.tsx';

// Функция для преобразования дня года в день и месяц на русском
const day = (dayOfYear: number): string => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let remainingDays = dayOfYear;
  let month = 0;
  for (let i = 0; i < daysInMonth.length; i++) {
    if (remainingDays <= daysInMonth[i]) {
      month = i;
      break;
    }
    remainingDays -= daysInMonth[i];
  }
  return `${remainingDays} ${months[month]}`;
};

type InfoListPropsType = {
  total_spend_galactic: string; // общие расходы в галактических кредитах
  less_spent_civ: string; //цивилизация с минимальными расходами
  rows_affected: number; //количество обработанных записей
  less_spent_value: number; // максимальная сумма расходов за день
  big_spent_civ: string; //цивилизация с максимальными расходами
  average_spend_galactic: string; // средние расходы в галактических кредитах
  less_spent_at: number; //день года с минимальными расходами
  big_spent_at: number; //день года с максимальными расходами
  type?: 'column' | 'row';
};

const InfoList: React.FC<InfoListPropsType> = ({
  rows_affected,
  total_spend_galactic,
  less_spent_civ,
  big_spent_civ,
  less_spent_value,
  average_spend_galactic,
  less_spent_at,
  big_spent_at,
  type = 'row',
}) => {
  return (
    <div
      className={type === 'column' ? style.containerColumn : style.containerRow}
    >
      <div className={style.firstColumn}>
        <RowInfo
          type={type}
          title={'общие расходы в галактических кредитах'}
          value={total_spend_galactic}
        />
        <RowInfo
          type={type}
          title={'количество обработанных записей'}
          value={rows_affected}
        />
        <RowInfo
          type={type}
          title={'день года с минимальными расходами '}
          value={day(less_spent_at)}
        />
        <RowInfo
          type={type}
          title={'цивилизация с максимальными расходами'}
          value={big_spent_civ}
        />
      </div>
      <div className={style.firstColumn}>
        <RowInfo
          type={type}
          title={'цивилизация с минимальными расходами'}
          value={less_spent_civ}
        />
        <RowInfo
          type={type}
          title={'день года с максимальными расходами  '}
          value={day(big_spent_at)}
        />
        <RowInfo
          type={type}
          title={'максимальная сумма расходов за день '}
          value={less_spent_value}
        />
        <RowInfo
          type={type}
          title={'средние расходы в галактических кредитах'}
          value={average_spend_galactic}
        />
      </div>
    </div>
  );
};

export default InfoList;
