import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import * as auth from '../auth.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const [isTooltipSuccessful, setTooltipSuccessful] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = React.useState({});

  //регистрация и авторизация

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(token)
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate])

  const handleLogin = (formData) => {
    auth.authorize(formData.email, formData.password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/');
        setUserEmail(formData.email);
      })
      .catch((err) => {
        console.log(err);
        setTooltipSuccessful(false);
        setTooltipOpen(true);
      });

  }

  const handleRegistration = (formData) => {
    auth.register(formData.email, formData.password)
      .then((res) => {
        setTooltipSuccessful(true);
        setTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        
        setTooltipSuccessful(false);
        setTooltipOpen(true);
      });
  }

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in');
  }

  //отрисовка страницы
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setTooltipOpen(false);
    setSelectedCard({});
  }
  const handleUpdateUser = ({ name, about }) => {
    api.editUserData({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }
  const handleUpdateAvatar = ({ avatar }) => {
    api.changeAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    // отправить запрос в API и обновить данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewItem(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    api.setAuthHeaders();
    api.getUserData()
      .then(userData => setCurrentUser(userData))
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    api.setAuthHeaders();
    api.getInitialCards()
      .then((res) => {
        console.log(Object.values(res))
        setCards(Object.values(res));
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          logout={loggedIn && onLogout}
          userEmail={userEmail}
          loggedIn={loggedIn}
          url={location.pathname}
        />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          } />
          <Route
            path='/sign-in'
            element={<Login handleLogin={handleLogin} />} />
          <Route
            path='/sign-up'
            element={<Register handleRegistration={handleRegistration} />} />
        </Routes>
        <Footer />


        {/* попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isTooltipSuccessful}
        />

      </div>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

    </CurrentUserContext.Provider>
  )
}

export default App