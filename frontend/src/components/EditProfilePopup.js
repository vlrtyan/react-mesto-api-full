import PopupWithForm from "./PopupWithForm";
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value)
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
      }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name={'edit-profile'}
            title={'Редактировать профиль'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onUpdateUser={props.onUpdateUser}
            onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={handleNameChange}
                type="text"
                placeholder="Жак-Ив Кусто"
                className="popup__input name-popup__input name-popup__input_type_name"
                name="fullname"
                id="fullname"
                required
                minLength="2"
                maxLength="40" />
            <span className="error" id="fullname-error"></span>
            <input
                value={description}
                onChange={handleDescriptionChange}
                type="text"
                placeholder="Исследователь океана"
                className="popup__input name-popup__input name-popup__input_type_description"
                name="description"
                id="description"
                required
                minLength="2"
                maxLength="200" />
            <span className="error" id="description-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;