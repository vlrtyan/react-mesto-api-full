import CurrentUserContext from '../contexts/CurrentUserContext.js';
import React from 'react';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? '' : 'element__delete-button_invisible'}`
    );
    const isLiked = props.card.likes.some(like => like === currentUser._id);
    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_clicked' : ''}`; 

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <div className="element">
            <img className="element__image" src={`${props.card.link}`} alt={`${props.card.name}`} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card