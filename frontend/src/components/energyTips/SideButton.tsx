import React from 'react';
import style from './energyTips.module.css';

/**
 * Menu-button. Changes the energy tip displayed when clicked.
 */
interface ISideButton {
    title: string;
    id: number;
    onSelect: (event: any) => void;
    selected: number;
}

const SideButton = (props: ISideButton) => {
  const {
    title, id, onSelect, selected,
  } = props;
  return (
    <button onClick={() => onSelect(id)} className={style.sideButton} type="button" style={{ backgroundColor: id === selected ? '#991875' : '' }}>
      {title}
    </button>
  );
};

export default SideButton;
