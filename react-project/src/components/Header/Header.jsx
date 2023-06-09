import './header.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';

function Header() {
    
    return (
<header className='header'>
    
    <div className='header__logo logo'>
    <NavLink to='/'><img className='logo__img' src="/images/logo.jpg" alt="logo" /></NavLink>
    </div>
    
    
    <nav className='header__navigation navigation'>
        <ul className='navigation__list'>
            <li className='navigation__list__item item--home'><NavLink className='navigation-link navigation-link--home' to="/">Home</NavLink></li>
            <li className='navigation__list__item item--cards'><NavLink className='navigation-link navigation-link--cards' to="/game">Cards</NavLink></li>
        </ul>
    </nav>
</header>
    );
}
export default Header;