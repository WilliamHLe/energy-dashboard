import React, { useEffect } from 'react';

interface Ibuilding {
    name: string,
    tek: string,
    areal: number,
    year: number,
    energimerke: string,
  }

const ProgressBar = (props: {building: string | Ibuilding | undefined, place: string}) => {
  const completed = 40;
  const { building, place } = props;

  useEffect(() => {
    console.log(building);
    console.log(place);
    // get data from api here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
        <span>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
