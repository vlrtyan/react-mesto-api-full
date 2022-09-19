import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup image-popup ${(!!props.card.name && !!props.card.link) ? 'popup_opened' : ''}`}>
            <div className="image-popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <img className="image-popup__image" src={`${props.card.link}`} alt={`${props.card.name}`}/>
                <h3 className="image-popup__title">{props.card.name}</h3>
            </div>
        </div>
    )
}

export default ImagePopup 