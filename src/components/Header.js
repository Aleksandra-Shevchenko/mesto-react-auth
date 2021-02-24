import logo from '../images/logo-white.svg';
import { Link, Route } from 'react-router-dom';


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
          <div className='header__user-box'>
            <p className='header__email'>{email}</p>
            <button onClick={onSignOut} className='header__link header__button'>Выйти</button>
          </div>
        </Route>
      </div>     
    </header>
  )
}

export default Header;
