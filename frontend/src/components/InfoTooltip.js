import success from '../images/success-icon.svg';
import fail from '../images/fail-icon.svg';

function InfoTooltip(props) {
    const successMessage = 'Вы успешно зарегистрировались!';
    const failMessage = 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className={`popup popup_type_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button className='popup__close-button' type='button' onClick={props.onClose}></button>
                <img className='tooltip__image' src={props.isSuccessful ? success : fail} alt='Назание сайта: Mesto Russia' />
                <h3 className='tooltip__message'>{props.isSuccessful ? successMessage : failMessage}</h3>
            </div>
        </div>
    )
}

export default InfoTooltip