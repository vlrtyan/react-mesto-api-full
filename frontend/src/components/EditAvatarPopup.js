import PopupWithForm from "./PopupWithForm";
import React from 'react';

function EditAvatarPopup(props) {
    const inputRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    React.useEffect(() => {
        inputRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name={'edit-avatar'}
            title={'Обновить аватар'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                type="url"
                placeholder="Ссылка"
                className="popup__input avatar__input avatar__input_type_link"
                name="link"
                id="avatar-link"
                required
                ref={inputRef}
            />
            <span className="error" id="avatar-link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;