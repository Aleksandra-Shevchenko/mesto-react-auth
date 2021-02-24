import React from 'react';

//--- Компонент регистрации ---
function Entrance({ name, title, btnName, children, handleRegistration }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  //---ОБРАБОТЧИКИ---
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(password, email);
  }
  
  //---РАЗМЕТКА JSX---
  return (
    <section className={`entrance page__center`} >
      <div className={`entrance__container`}>
        <h3 className={`entrance__title`}>{title}</h3>
        <form className="entrance__form" name={`entrance-form-${name}`} noValidate
        onSubmit={handleSubmit}
        >
          <input
            value={email}
            onChange={handleChangeEmail}
            id="loggin-input"
            type="email"
            placeholder="Email"
            className="entrance__input"
            name="loggin"
            minLength="2"
            maxLength="40"
            required
          />

          <input
            value={password}
            onChange={handleChangePassword}
            id="password-input"
            type="text"
            placeholder="Пароль"
            className="entrance__input"
            name="password"
            minLength="4"
            maxLength="10"
            required
          />

          <button className={`entrance__submit-btn`} type="submit">{btnName}</button>
          <>{children}</>
        </form>
      </div>
    </section>
  )
}
  
export default Entrance;
  
