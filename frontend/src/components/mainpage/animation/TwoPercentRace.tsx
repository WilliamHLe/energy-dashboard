import React from 'react';
import style from './twoPercentRace.module.css';
import Bicycle from '../../../assets/images/bisycle.svg';
import Girl from '../../../assets/images/Girl.png';
import Tronder from '../../../assets/images/tronder.png';

interface ITwoPercentRace{
    loading: boolean;
}

const TwoPercentRace = (props: ITwoPercentRace) => {
  const { loading } = props;
  const saved = 3.59;
  const progress = saved * 25;
  document.documentElement.style.setProperty('--progress-tronder', `${progress.toString()}%`);

  return (
    <div className={loading ? style.loading : ''}>
      <div className={style.goalText} style={{ margin: loading ? '0 auto' : '2% 0% 0% 5%' }}>
        <h1>Kappløpet mot klimamålet er i gang!</h1>
        <p>Vi må spare mer enn 2% av energiforbruket sammenlignet med i fjor</p>
        <a id={style.button} style={{ visibility: loading ? 'hidden' : 'visible' }} href="/energitips" type="button">Les mer om 2% målet</a>
      </div>
      <div className={style.animation}>
        <div className={!loading ? style.goal : style.goalLoading}>
          <img id={style.girlImg} width="13%" src={Girl} alt="jente på sykkel" />
          <img id={style.bikeImg} width="13%" src={Bicycle} alt="sykkel" />
        </div>
        <div className={!loading ? style.progressbar : style.progressbarLoading}>
          <div id={style.progress}>
            <span className={style.label}>{`${2}%`}</span>
          </div>
        </div>
        <div>
          <div className={!loading ? style.tronder : style.tronderLoading}>
            <img id={style.girlImg} width="13%" src={Tronder} alt="jente på sykkel" />
            <img id={style.bikeImg} width="13%" src={Bicycle} alt="sykkel" />
          </div>
          <div className={!loading ? style.progressbar : style.progressbarLoading}>
            <div id={style.progressTronder}>
              <span className={style.label}>{`${saved}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoPercentRace;
