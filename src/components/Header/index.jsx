import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';


const Header = props => (
  <div className="Header">
    <div className="Logo">Quizzy</div>
    {props.username ? <div className="Hello">{props.username}</div> : null}

  </div>
);

export default Header;
Header.propTypes = {
  username: PropTypes.string.isRequired,
};
