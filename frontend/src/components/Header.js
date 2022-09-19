import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  const url = props.url;

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Назание сайта: Mesto Russia' />
      <div className='header__auth'>
        {props.loggedIn && <p className='header__email'>{props.userEmail}</p>}
        {url === '/sign-in' && <Link
          className='header__button'
          to='/sign-up'>Регистрация</Link>}
        {url === '/sign-up' && <Link
          className='header__button'
          to='/sign-in'>Войти</Link>}
        {props.loggedIn && <button
          onClick={props.logout}
          className='header__logout'>Выход</button>}
      </div>

    </header>
  )
}

export default Header