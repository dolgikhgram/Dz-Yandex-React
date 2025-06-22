import style from './AnalyticsTitle.module.css';

const AnalyticsTitle = () => {
  return (
    <div>
      <div className={style.mainTextContainer}>
        <div className={style.defaultText}>Загрузите</div>
        <div className={style.spanText}>csv</div>
        <div className={style.defaultText}>файл и</div>
        <div className={style.spanText}>получите полную информацию</div>
        <div className={style.defaultText}> о нём за сверхнизкое время</div>
      </div>
    </div>
  );
};

export default AnalyticsTitle;
