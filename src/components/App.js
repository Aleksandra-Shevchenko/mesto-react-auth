import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';


import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from "./ProtectedRoute.js";

import * as auth from '../auth.js';



function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] = React.useState({isOpen: false, card: {}});

  const[renderSaving, setRenderSaving] = React.useState(false);




  const[loggedIn, setLoggedIn] = React.useState(false);
  
  function handleLoggedIn() {
    console.log('d')
    setLoggedIn(true);
  }

  const history = useHistory();




  //---ЭФФЕКТЫ---
  //при загрузке страницы получаем данные карточек
  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  //при загрузке страницы получаем данные пользователя
  React.useEffect(() => {
    api.getUserData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
    

  //---ОБРАБОТЧИКИ---
  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard({...selectedCard, isOpen: true, element: card});
  }
  
  function handleDeletePlaceClick(card) {
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: true, card: card});
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({...selectedCard, isOpen: false});
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: false});
  }

  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

  //изменение данных пользователя
  function handleUpdateUser(newUserData) {
    setRenderSaving(true);
    api.saveUserChanges(newUserData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
  }

  //изменение аватара пользователя
  function handleUpdateAvatar(newAvatarLink) {
    setRenderSaving(true);
    api.changedAvatar(newAvatarLink)
      .then((data) => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
  }

  //добавление новой карточки
  function handleAddPlaceSubmit(cardData) {
    setRenderSaving(true);
    api.postNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
  }

  //постановка/снятие лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  } 

  //удаление карточки
  function handleCardDelete(card) {
    setRenderSaving(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id === card._id ? false : true);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderSaving(false);
      });
  } 



  // onRegister, onLogin и onSignOut
  // Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js.

  function onRegister(password, email){
    auth.register(password, email)
      .then((res) => {
        if(res){ 
          history.push('/sign-in');
        } else {
          console.log('error');
          //тут надо вызвать
      });
  }

   function onLogin (password, email) {
     auth.authorize(password, email)
      .then(data =>{
        if(data.token){
          handleLoggedIn();
          history.push('/');
        }
      })
      .catch(err => console.log(err)); 
   }




  //---РАЗМЕТКА JSX---
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />

      <Switch>

        <ProtectedRoute
          exact path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onDeletePlace={handleDeletePlaceClick}
        />
          

        <Route  path="/sign-in">
          <Login onLogin={onLogin}/>
        </Route>

        <Route  path="/sign-up">
          <Register onRegister={onRegister}/>
        </Route>

        <Route>
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/sign-in" />
          )}
        </Route>

      </Switch>

      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlayClose={handleOverlayClickClose} />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onUpdateUser={handleUpdateUser}
        isRender={renderSaving}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onUpdateAvatar={handleUpdateAvatar}
        isRender={renderSaving}
      /> 

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onAddPlace={handleAddPlaceSubmit}
        isRender={renderSaving}
      />

      <DeletePlacePopup
        deleteCard={selectedCardDeleteConfirm}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onDeleteCard={handleCardDelete}
        isRender={renderSaving}
      />     
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
