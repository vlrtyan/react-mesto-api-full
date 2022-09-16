import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegistration }) {
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(formData);
        setFormData({ email: '', password: '' });
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit} className="register__form" name="login">
                <h1 className="register__title">Регистрация</h1>
                <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className="register__input"
                    name="email"
                    id="email"
                    required />
                <input
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Пароль"
                    className="register__input"
                    name="password"
                    id="password"
                    required />
                <button onSubmit={handleSubmit} className="register__submit-button" type="submit">Зарегистрироваться</button>
                <div className="redirect">
                    <p className="redirect__text">Уже зарегистрированы? </p>
                    <Link to="/sign-in" className="redirect__link">Войти</Link>
                </div>
            </form>
        </div>
    )
}

export default Register