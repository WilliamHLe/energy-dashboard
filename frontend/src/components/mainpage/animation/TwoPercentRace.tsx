import React, { useEffect, useState } from 'react';
import style from './twoPercentRace.module.css';
import Bicycle from '../../../assets/images/bisycle.svg';
import Girl from '../../../assets/images/Girl.png';
import Tronder from '../../../assets/images/tronder.png';
import getMetrics from '../../../services/metricsService';

interface ITwoPercentRace{
    loading: boolean;
}

const TwoPercentRace = (props: ITwoPercentRace) => {
  const { loading } = props;
  /* Percent saved is supposed to be fetched */
  const [saved, setSaved] = useState<number>(3.59);
  const [progress, setProgress] = useState<number>(saved * 25);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMetrics(undefined);
      setSaved(response.energySaved);
      setProgress(response.energySaved * 25);
    };
    fetchData();
  }, []);

  /* Sets the width of the tronder-bicycle */
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
          <img id={loading ? style.girlImgLoading : style.girlImg} width={loading ? '140px' : '100px'} src={Girl} alt="jente på sykkel" />
          <img id={style.bikeImg} width={loading ? '140px' : '100px'} src={Bicycle} alt="sykkel" />
        </div>
        <div className={!loading ? style.progressbar : style.progressbarLoading}>
          <div id={style.progress}>
            <span className={style.label}>{`${2}%`}</span>
          </div>
        </div>
        <div>
          <div className={!loading ? style.tronder : style.tronderLoading}>
            <img id={loading ? style.girlImgLoading : style.girlImg} width={loading ? '140px' : '100px'} src={Tronder} alt="jente på sykkel" />
            <img id={style.bikeImg} width={loading ? '140px' : '100px'} src={Bicycle} alt="sykkel" />
          </div>
          <div className={!loading ? style.progressbar : style.progressbarLoading}>
            <div id={style.progressTronder}>
              <span className={style.label}>{`${saved}%`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.bottomLabel}>
        <div className={!loading ? style.labelWrapper : style.labelWrapperLoading}>
          <span className={style.circle} />
          <p className={style.bottomLabelText}>Energisparemålet</p>
        </div>
        <div className={!loading ? style.labelWrapper : style.labelWrapperLoading}>
          <span className={style.circle} id={style.blue} />
          <p className={style.bottomLabelText}>Trondheim kommune</p>
        </div>
      </div>
    </div>
  );
};

export default TwoPercentRace;
