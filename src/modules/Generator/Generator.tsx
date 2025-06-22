import style from './Generator.module.css';
import GeneratorTittle from './GeneratorTittle/GeneratorTittle.tsx';
import Button from '../common/ButtonCollection/Button /Button.tsx';
import React from 'react';
import ButtonUpload from '../common/ButtonCollection/ButtonUpload/ButtonUpload.tsx';

const Generator = () => {
  const [statusBtn, setStatusBtn] = React.useState<
    'uploaded' | 'download' | 'done' | 'error'
  >('download');
  const resetButton = () => {
    setStatusBtn('download');
  };
  const generationData = async () => {
    console.log('Generation Data');
    setStatusBtn('uploaded');
    fetch(
      `http://localhost:3000/report?size=0.01&withErrors=off&maxSpend=10000`,
      {
        method: 'GET',
        headers: {
          accept: 'text/csv',
        },
      }
    )
      .then(response => {
        console.log('запрос пошёл');
        if (!response.ok) throw new Error('Ошибка запроса');
        console.log(response);
        return response.blob();
      })
      .then(blob => {
        console.log('blob');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setStatusBtn('done');
      })
      .catch(error => {
        setStatusBtn('error');
        console.error('Ошибка:', error);
      });
  };
  return (
    <div className={style.container}>
      <GeneratorTittle />
      <div className={style.btnContainer}>
        {(statusBtn === 'download' && (
          <Button type={'download'} onClick={generationData}>
            Начать генерацию
          </Button>
        )) ||
          (statusBtn === 'uploaded' && (
            <ButtonUpload
              type={'uploaded'}
              secondaryText={'идёт процесс генерации'}
            />
          )) ||
          (statusBtn === 'done' && (
            <ButtonUpload
              type={'done'}
              onClick={resetButton}
              secondaryText={'файл сгенерирован!'}
            >
              Done!
            </ButtonUpload>
          )) ||
          (statusBtn === 'error' && (
            <ButtonUpload
              type={'error'}
              onClick={resetButton}
              secondaryText={'упс, не то...'}
            >
              Ошибка
            </ButtonUpload>
          ))}
      </div>
    </div>
  );
};

export default Generator;
