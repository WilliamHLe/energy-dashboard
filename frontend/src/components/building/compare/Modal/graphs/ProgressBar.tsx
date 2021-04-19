import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Ibuilding {
    name: string,
    tek: string,
    areal: number,
    year: number,
    energimerke: string,
  }

const ProgressBar = (props: {building: string | Ibuilding | undefined,
  place: string, data: string}) => {
  const [completed, setCompleted] = useState();
  const { building, place, data } = props;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      if (data === 'spart') {
        const response = await axios.get(`/energy/saved/total/${building}`);
        setCompleted(response.data);
      }
      if (data === 'avg') {
        const response = await axios.get(`/energy/average/${building}`);
        setCompleted(response.data);
      }
      setLoading(false);
    };
    fetchdata();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div
          style={{
            width: `${completed}%`,
            backgroundColor: place === 'left' ? '#4CEF79' : '#CE32E7',
            float: place === 'left' ? 'right' : 'left',
            borderRadius: place === 'left' ? '13px 5px 5px 13px' : '5px 13px 13px 5px',
            textAlign: place === 'left' ? 'left' : 'right',
            padding: '1% 2%',
            fontSize: '19px',
          }}
        >
          {/* @ts-ignore */}
          <span>{`${completed.percentSaved ? completed.percentSaved : completed.averageEnergy[0].avg}%`}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
