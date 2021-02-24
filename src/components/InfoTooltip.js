import React from 'react';
import useEscapeClose from '../hooks/useEscapeClose.js';

//--- Компонент всплывающих подсказок ---
function InfoTooltip({ onClose, onOverlayClose, isOpen }) {

  //---Закрытие по Esc ---
  useEscapeClose(isOpen, onClose);

  //---РАЗМЕТКА JSX---
  return (
    <section className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : false}`} onClick={onOverlayClose}>
      <div className="popup__container popup__container_type_info-tooltip">
        {/* <img className="popup__photo" src={link} alt={`Фото ${name}`} /> */}
        <h2 className="popup__photo-title">text....</h2>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно" />
      </div>
    </section>
  )
}
    
export default InfoTooltip;
    