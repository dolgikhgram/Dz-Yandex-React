import style from './Header.module.css';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const analyticsBtnDefault = classNames(
    `${style.btn}`,
    `${style.analysticsBtn}`
  );
  const generatorBtnDefault = classNames(
    `${style.btn}`,
    `${style.generatorBtn}`
  );
  const historyBtnDefault = classNames(`${style.btn}`, `${style.historyBtn}`);
  const url = useLocation();
  return (
    <div className={style.container}>
      <div className={style.logosContainer}>
        <img
          src={'./summerSchools.png'}
          alt='Summer Schools'
          className={style.summerSchools}
        />
        <img
          src={'./intergalacticAnalyticsLogo.png'}
          alt='Intergalactic Analytics'
          className={style.intergalacticAnalytics}
        />
      </div>
      <div className={style.btnContainer}>
        <Link to={'/analytics'} className={analyticsBtnDefault}>
          {url.pathname === '/analytics' || url.pathname === '/' ? (
            <img src={'./csvAnalyticsBtnActive.svg'} alt='CSV Analytics' />
          ) : (
            <img src={'./csvAnalyticsBtnDefault.svg'} alt='CSV Analytics' />
          )}
        </Link>
        <Link to={'/generator'} className={generatorBtnDefault}>
          {url.pathname === '/generator' ? (
            <img src={'./csvGeneratorBtnActive.svg'} alt='Generator Btn' />
          ) : (
            <img src={'./csvGeneratorBtnDefault.svg'} alt='Generator Btn' />
          )}
        </Link>
        <Link to={'/history'} className={historyBtnDefault}>
          {url.pathname === '/history' ? (
            <img src={'./historyBtnActive.svg'} alt='History Btn' />
          ) : (
            <img src={'./historyBtnDefault.svg'} alt='History Btn' />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
