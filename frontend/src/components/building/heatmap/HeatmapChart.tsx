import React, { useEffect, useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';
import { useParams } from 'react-router';
import style from './heatmapChart.module.css';
import { getEnergySavedWeekly } from '../../../services/energyService';

export default function HeatMapChart() {
  const { id } = useParams<{id: string}>();
  const xLabels = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
  const yLabels = ['4', '3', '2', '1'];

  const [data, setData] = useState<number[][]>([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
  // Fetching how much energy the current building have saved on a weekly basis
  useEffect(() => {
    const fetchData = async () => {
      setData(await getEnergySavedWeekly(id));
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className={style.labels}>
        <h3>
          Forbruk per uke kontra i fjor
        </h3>
        <div className={style.colorLabel}>
          <svg height="0.6em" width="0.6em"><circle cx="0.3em" cy="0.35em" r="0.25em" fill="rgba(149, 220, 237, 1)" /></svg>
          <h4 className={style.labelText}>
            Nådd energisparemålet på 2%
          </h4>
        </div>
        <div className={style.colorLabel}>
          <svg height="0.6em" width="0.6em"><circle cx="0.3em" cy="0.35em" r="0.25em" fill="rgba(92, 194, 219, 1)" /></svg>
          <h4 className={style.labelText}>
            Brukt mindre energi, ikke nådd energisparemålet
          </h4>
        </div>
        <div className={style.colorLabel}>
          <svg height="0.6em" width="0.6em"><circle cx="0.3em" cy="0.35em" r="0.25em" fill="rgba(49, 97, 114, 1)" /></svg>
          <h4 className={style.labelText}>
            brukt mer energi kontra i fjor
          </h4>
        </div>
      </div>
      <div className={style.heatmap}>
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          cellRender={(x, y, value) => (
            <div>{`${value}%`}</div>
          )}
          xLabelsStyle={() => ({
            color: 'rgba(255, 255, 255, .8)',
            fontSize: '.65rem',
          })}
          yLabelsStyle={() => ({
            fontSize: '.65rem',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, .8)',
          })}
          cellStyle={(_x, _y, ratio) => {
            let backgroundColors: string;
            let textColor: string = 'rgba(78, 78, 78)';
            if (ratio < 0.45) {
              backgroundColors = 'rgb(49, 97, 114)';
              textColor = 'rgba(255, 255, 255, .8)';
            } else if (ratio < 0.63) {
              backgroundColors = 'rgb(92, 194, 219)';
            } else {
              backgroundColors = 'rgb(149, 220, 237)';
            }
            return (
              {
                background: backgroundColors,
                fontSize: '.5rem',
                color: textColor,
                borderRadius: 0,
                border: '.5px solid rgba(78, 78, 78, 1)',
              });
          }}
          cellHeight="1.5rem"
          xLabelsPos="bottom"
        />
      </div>
    </>
  );
}
