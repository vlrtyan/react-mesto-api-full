import PopupWithForm from "./PopupWithForm";
import React from 'react';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value)
    }
    function handleLinkChange(event) {
        setLink(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name, link
        });
    }

    React.useEffect(() => {
        setName('');
        setLink('');
      }, [props.isOpen]);

    return (
        <PopupWithForm
            name={'add-place'}
            title={'Новое место'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleNameChange}
                value={name}
                placeholder="Название"
                className="popup__input new-item__input new-item__input_type_name"
                name="name"
                id="place-name"
                required
                minLength="2"
                maxLength="30" />
            <span className="error" id="place-name-error"></span>
            <input
                type="url"
                onChange={handleLinkChange}
                value={link}
                placeholder="Ссылка на картинку"
                className="popup__input new-item__input new-item__input_type_link"
                name="link"
                id="place-link"
                required />
            <span className="error" id="place-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup