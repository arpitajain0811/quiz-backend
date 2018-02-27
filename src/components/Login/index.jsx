import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';


const Login = props => (
  <div className="Login">
    <div className="LoginBox">
      <div className="WelcomeQuizzy">
        <div className="Welcome">Welcome</div>
        <div className="Welcome">to</div>
        <div className="Quizzy">Quizzy!</div>
      </div>
      <div className="LoginForm">
        <div className="LoginHeading">Login</div>
        <div className="Input">Username<br />
          <input
            className="UserInput"
            type="text"
            onChange={(text) => { props.onTextChange(text); }}
            value={props.username}
          />
        </div>
        <div >
          <button
            className="LoginBtn"
            onClick={() => props.saveUsername()}
          > Login
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
Login.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  saveUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
