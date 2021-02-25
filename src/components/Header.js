import logo from '../images/logo-white.svg';
import React from 'react';
import { Link, Route } from 'react-router-dom';



// Привет! В реакте нужно сделать стейт true/false и повесить обработчик на кнопку открытия меню. Если меню открыто, то элементу добавляется БЭМ модификатор открытого меню (элемент на который модификатор нужно повесить зависит от верстки). Все остальное делается в css - перестраивается шапка при открытии меню, описываются стили шапки в зависимости от того показано ли меню (в БЭМ модификаторе) и с помощью медиа запроса на нужной ширине экрана элементы скрываются или отображаются

//--- Компонент шапки сайта ---
function Header({email, onSignOut}) {

  return (
    <header className="header page__center">
      <div className="header__box">
        <img className="logo" src={logo} alt="Логотип Место" />
        <Route path="/sign-in">
          <Link to='sign-up' className='header__link'>Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to='sign-in' className='header__link'>Войти</Link>
        </Route>
        <Route exact path="/">
          <div className='header__menu'>
            <div className='header__user-box'>
              <p className='header__email'>{email}</p>
              <button onClick={onSignOut} className='header__link header__button'>Выйти</button>
            </div>
          </div>

        </Route>
      </div>     
    </header>
  )
}

export default Header;
