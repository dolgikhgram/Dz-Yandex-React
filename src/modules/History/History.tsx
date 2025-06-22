import style from './History.module.css';
import RowHistory from './RowHistory/RowHistory.tsx';
import Button from '../common/ButtonCollection/Button /Button.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../Store/Store.tsx';
import Modal from '../common/Portal/Portal.tsx';
import InfoList from '../Analytics/InfoList/InfoList.tsx';
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

const History = () => {
  const { reset, tableData } = useStore();
  console.log(tableData);
  const [currId, setId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (id: string) => {
    setId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const [state, setState] = useState<Record<string, HistoryItem>>(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : {};
  });
  const arrKey = Object.keys(state);
  const clearHistory = () => {
    localStorage.clear();
    setState({});
    reset();
  };
  return (
    <div className={style.container}>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InfoList
          rows_affected={state[currId]?.rows_affected || 0}
          total_spend_galactic={state[currId]?.total_spend_galactic || '0'}
          less_spent_civ={state[currId]?.less_spent_civ || ''}
          big_spent_civ={state[currId]?.big_spent_civ || ''}
          less_spent_value={state[currId]?.less_spent_value || 0}
          average_spend_galactic={state[currId]?.average_spend_galactic || '0'}
          less_spent_at={state[currId]?.less_spent_at || 0}
          big_spent_at={state[currId]?.big_spent_at || 0}
          type={'column'}
        />
      </Modal>
      {arrKey.map(el => {
        return (
          <RowHistory
            name={state[el].name}
            key={el}
            date={state[el].date}
            processed={state[el].processed}
            id={el}
            setState={setState}
            onClick={openModal}
          />
        );
      })}
      <div className={style.btnContainer}>
        <Link to={'/generator'}>
          <Button type={'download'}>Сгенерировать больше</Button>
        </Link>
        {arrKey.length > 0 && (
          <Button type={'clear'} onClick={clearHistory}>
            Очистить всё
          </Button>
        )}
      </div>
    </div>
  );
};

export default History;
