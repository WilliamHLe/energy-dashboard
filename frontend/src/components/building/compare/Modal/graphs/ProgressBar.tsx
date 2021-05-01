import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from '../modal.module.css';

interface Ibuilding {
    name: string,
    tek: string,
    areal: number,
    year: number,
    energimerke: string,
  }

const ProgressBar = (props: {building: string | Ibuilding | undefined,
  place: string, data: string}) => {
  const { category } = useParams<{ category:string }>();
  const [completed, setCompleted] = useState<{value:number | string, type:string}>({ value: 0, type: 'spart' });
  // eslint-disable-next-line no-unused-vars
  const [width, setWidth] = useState<number | null>();
  const { building, place, data } = props;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      if (data === 'spart') {
        try {
          const response = await axios.get(`/energy/saved/total/${building}`);
          setWidth(response.data.percentSaved > 0
            ? Math.min(response.data.percentSaved * 5, 100)
            : 0);
          setCompleted({ value: `${response.data.percentSaved}%`, type: 'spart' });
        } catch (e) {
          setWidth(null);
          setCompleted({ value: 'Ingen data', type: 'spart' });
        }
      }
      if (data === 'avg') {
        try {
          const response = await axios.get(`/energy/average/${building}`);
          const responseCategory = await axios.get(`/energy/average/${category}`);
          const tempWidth = (
            response.data.averageEnergy[0].average
              / responseCategory.data.averageEnergy[0].average
          ) * 100;
          setWidth(tempWidth);
          setCompleted({ value: response.data.averageEnergy[0].average, type: 'avg' });
        } catch (e) {
          setWidth(null);
          setCompleted({ value: 'Ingen data', type: 'avg' });
        }
      }
      setLoading(false);
    };
    fetchdata();
  }, [building, category, data]);

  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div
          className={place === 'left' ? style.barLeft : style.barRight}
          style={{
            width: `${width}%`,
          }}
        >
          {completed.value}
        </div>
      )}
    </div>
  );
};
// s
export default ProgressBar;
