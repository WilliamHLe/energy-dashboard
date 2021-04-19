import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { useParams } from 'react-router';
import style from '../building.module.css';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);
// ssd
function EnergySaved() {
  const { id } = useParams<{id: string}>();

  // const [data, setData] = useState<any>([]);
  const [building, setBuilding] = useState<any>();
  const [saved, setSaved] = useState<any>();
  const [savedKr, setSavedKr] = useState<any>();
  const [barPercent, setBarPercent] = useState<any>();
  useEffect(() => {
    setBuilding(id);
    const tempSaved = 5;
    if (tempSaved < -4) {
      setBarPercent(0);
    } else if (tempSaved > 8) {
      setBarPercent(100);
    } else {
      setBarPercent((((tempSaved + 4) / 12) * 100));
    }
    setSaved(tempSaved);
    setSavedKr(23000);
  }, [id]);

  return (
    <div>
      <h3 className={`${style.title}`}>
        {building}
        {' '}
        har spart
        {' '}
        {saved}
        {'% '}
        sammeligned med i fjor!
      </h3>
      <div>
        <div className={`${style.saved}`}>
          <h3>Dette utgjør:</h3>
          <h2>
            {savedKr}
            {' '}
            kr
          </h2>
        </div>
        <img className={style.image} alt="Bilde av Jorda" src="https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-earth-planet-icon-earth-icon-by-vexels.png" />
      </div>
      {/* Code found here: https://stackoverflow.com/questions/31991092/progress-bar-with-reference-line-using-css-and-html/31992281#31992281 */}
      <div className={style.progress}>
        <div className={style.bar}>
          <div className={style.percent} />
          <div className={style.current} style={{ left: `${barPercent}%` }} data-ref={`${saved}%`} />
          <div className={style.goal} style={{ left: '50%' }} data-ref="2%" />
        </div>
      </div>
    </div>
  );
}

export default EnergySaved;
