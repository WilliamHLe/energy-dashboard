import React from 'react';
import InfoItem from './InfoItem';
import Icon from './icons/noto_house.png';

const InfoBar = () => (
  <div>
    <div className="">
      <InfoItem heading="660" description="Bygg som overvåkes" icon={Icon} />
    </div>
  </div>
);

export default InfoBar;
