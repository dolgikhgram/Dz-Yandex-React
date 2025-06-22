import style from './Analytics.module.css';
import AnalyticsTitle from './AnalyticsTitle/AnalyticsTitle.tsx';
import ButtonUpload from '../common/ButtonCollection/ButtonUpload/ButtonUpload.tsx';
import Button from '../common/ButtonCollection/Button /Button.tsx';
import React, { type ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import InfoList from './InfoList/InfoList.tsx';
import { useStore } from '../../Store/Store.tsx';

const key = 'Analytics_Key';

type AnalyticsResults = {
  rows_affected?: number;
  total_spend_galactic?: number;
  less_spent_civ?: string;
  big_spent_civ?: string;
  less_spent_value?: number;
  average_spend_galactic?: number;
  less_spent_at?: number;
  big_spent_at?: number;
};

const Analytics = () => {
  const { add } = useStore();
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [statusBtn, setStatusBtn] = useState<
    'pending' | 'uploaded' | 'parsing' | 'process' | 'done' | 'error'
  >('pending');
  const [results, setResults] = useState<AnalyticsResults>({});

  const backgroundClass = classNames(
    statusBtn === 'pending'
      ? `${style.uploaderField}`
      : statusBtn === 'process'
        ? `${style.uploaderFieldTrue}`
        : statusBtn === 'uploaded'
          ? `${style.uploaderFieldTrue}`
          : statusBtn === 'done'
            ? `${style.uploaderFieldDone}`
            : statusBtn === 'error'
              ? `${style.uploaderFieldErorr}`
              : ''
  );

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    if (
      'target' in e &&
      e.target instanceof HTMLInputElement &&
      e.target.files != null
    ) {
      const selectedFile = e.target.files[0];
      
      // Устанавливаем название файла до проверки формата
      setFileName(selectedFile.name);
      
      // Проверяем формат файла
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'csv') {
        setStatusBtn('error');
        return;
      }

      console.log(selectedFile);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      setStatusBtn('process');
    }
    
    // Проверяем, является ли это событием drag (файл перетащен)
    if ('dataTransfer' in e && e.dataTransfer.files != null) {
      const selectedFile = e.dataTransfer.files[0];
      
      // Устанавливаем название файла до проверки формата
      setFileName(selectedFile.name);
      
      // Проверяем формат файла
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'csv') {
        setStatusBtn('error');
        return;
      }

      console.log(selectedFile);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      setStatusBtn('process');
    }
  };

  const handleSend = async () => {
    if (!file) return;

    // Сохраняем файл в localStorage только при отправке
    const timestamp = new Date().toISOString();
    
    if (!localStorage.getItem(key)) {
      localStorage.setItem(
        key,
        JSON.stringify({
          [timestamp]: {
            name: fileName,
            date: new Date().toLocaleDateString('ru-RU'),
            processed: false,
          },
        })
      );
    } else {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const obj = JSON.parse(storedData);
        obj[timestamp] = {
          name: fileName,
          date: new Date().toLocaleDateString('ru-RU'),
          processed: false,
        };
        localStorage.setItem(key, JSON.stringify(obj));
      }
    }

    const formData = new FormData();
    formData.append('file', file);
    setStatusBtn('uploaded');
    
    try {
      console.log('запрос отправлен');
      const response = await fetch(
        'http://localhost:3000/aggregate?rows=100000',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Не удалось получить reader для потока');
      }

      let result = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = new TextDecoder().decode(value);
        result += chunk;
      }

      const objects = result
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter(obj => obj !== null);
      setStatusBtn('done');
      setResults(objects[objects.length - 1]);

      // Обновляем запись в localStorage с аналитическими данными
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const obj = JSON.parse(storedData);
        obj[timestamp] = {
          name: fileName,
          date: new Date().toLocaleDateString('ru-RU'),
          processed: true,
          // Аналитические данные
          rows_affected: objects[objects.length - 1]['rows_affected'] || 0,
          total_spend_galactic:
            objects[objects.length - 1]['total_spend_galactic'] || 0,
          less_spent_civ: objects[objects.length - 1]['less_spent_civ'] || '',
          big_spent_civ: objects[objects.length - 1]['big_spent_civ'] || '',
          less_spent_value:
            objects[objects.length - 1]['less_spent_value'] || 0,
          average_spend_galactic:
            objects[objects.length - 1]['average_spend_galactic'] || 0,
          less_spent_at: objects[objects.length - 1]['less_spent_at'] || 0,
          big_spent_at: objects[objects.length - 1]['big_spent_at'] || 0,
        };
        localStorage.setItem(key, JSON.stringify(obj));
      }

      // Добавляем в store только после успешной обработки
      add(timestamp, {
        rows_affected: objects[objects.length - 1]['rows_affected'] || 0,
        total_spend_galactic:
          Number(objects[objects.length - 1]['total_spend_galactic']) || 0,
        less_spent_civ: objects[objects.length - 1]['less_spent_civ'] || '',
        big_spent_civ: objects[objects.length - 1]['big_spent_civ'] || '',
        less_spent_value: objects[objects.length - 1]['less_spent_value'] || 0,
        average_spend_galactic:
          Number(objects[objects.length - 1]['average_spend_galactic']) || 0,
        less_spent_at: objects[objects.length - 1]['less_spent_at'] || 0,
        big_spent_at: objects[objects.length - 1]['big_spent_at'] || 0,
      });
      
    } catch (error) {
      setStatusBtn('error');
      
      // Обновляем запись в localStorage как неуспешную
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const obj = JSON.parse(storedData);
        obj[timestamp] = {
          name: fileName,
          date: new Date().toLocaleDateString('ru-RU'),
          processed: false,
        };
        localStorage.setItem(key, JSON.stringify(obj));
      }
      
      console.error('Ошибка отправки:', error);
    }
  };

  const rest = () => {
    setFile(null);
    setFileName('');
    setStatusBtn('pending');
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.dataTransfer.files);
    handleFileChange(e);
    e.preventDefault();
    setDrag(false);
  };

  return (
    <div className={style.container}>
      <AnalyticsTitle />
      <div
        className={!drag ? backgroundClass : style.uploaderFieldTrue}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)}
        onDrop={e => onDropHandler(e)}
      >
        {(statusBtn === 'pending' && (
          <div className={style.uploadContainer}>
            <input
              type='file'
              onChange={handleFileChange}
              className={style.input}
            />
            <ButtonUpload
              type={'pending'}
              secondaryText={'или перетащите сюда'}
            >
              Загрузить файл
            </ButtonUpload>
          </div>
        )) ||
          (statusBtn === 'process' && (
            <div className={style.uploadContainer}>
              <ButtonUpload
                type={'process'}
                secondaryText={'файл загружен!'}
                onClick={rest}
              >
                {fileName}
              </ButtonUpload>
            </div>
          )) ||
          (statusBtn === 'uploaded' && (
            <div className={style.uploadContainer}>
              <ButtonUpload
                type={'uploaded'}
                secondaryText={'идёт парсинг файла'}
              >
                {fileName}
              </ButtonUpload>
            </div>
          )) ||
          (statusBtn === 'done' && (
            <div className={style.uploadContainer}>
              <ButtonUpload
                type={'done'}
                secondaryText={'готово!'}
                onClick={rest}
              >
                {fileName}
              </ButtonUpload>
            </div>
          )) ||
          (statusBtn === 'error' && (
            <div className={style.uploadContainer}>
              <ButtonUpload
                type={'error'}
                onClick={rest}
                secondaryText={'упс, не то...'}
              >
                {fileName}
              </ButtonUpload>
            </div>
          ))}
      </div>
      <div className={style.btnContainer}>
        {(statusBtn === 'pending' && (
          <Button type={'unactive'}>Отправить</Button>
        )) ||
          (statusBtn === 'process' && (
            <Button type={'active'} onClick={handleSend}>
              Отправить
            </Button>
          ))}
      </div>
      <div className={style.contentContainer}>
        {(statusBtn != 'done' && (
          <div className={style.contentTextContainer}>
            <div className={style.secondaryText}>Здесь</div>
            <div className={style.secondaryText}>появятся хайлайты</div>
          </div>
        )) ||
          (statusBtn === 'done' && (
            <InfoList
              rows_affected={results['rows_affected'] || 0}
              total_spend_galactic={
                results['total_spend_galactic']?.toString() || '0'
              }
              less_spent_civ={results['less_spent_civ'] || ''}
              big_spent_civ={results['big_spent_civ'] || ''}
              less_spent_value={results['less_spent_value'] || 0}
              average_spend_galactic={
                results['average_spend_galactic']?.toString() || '0'
              }
              less_spent_at={results['less_spent_at'] || 0}
              big_spent_at={results['big_spent_at'] || 0}
              type={'row'}
            />
          ))}
      </div>
    </div>
  );
};

export default Analytics;
