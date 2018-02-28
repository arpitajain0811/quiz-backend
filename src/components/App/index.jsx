import React, { Component } from 'react';
import './App.css';
import Header from '../Header';
import Login from '../Login';
import QuizBody from '../QuizBody';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      page: 1,
      userObj: {},
    };
  }
  onTextChange=(text) => {
    this.setState({
      username: text.target.value,
      page: 1,
    });
  }
onSubmit=() => {
  fetch('/user', {
    body: this.state.username,
    method: 'PUT',
  }).then(response => response.json()).then((responseObj) => {
    this.setState({
      userObj: responseObj,
      page: 2,
    });
  });
}
updateUser=() => {
  const promise = new Promise((resolve) => {
    fetch('/user', {
      body: this.state.username,
      method: 'PUT',
    }).then(response => response.json()).then((responseObj) => {
      this.setState({
        userObj: responseObj,
      });
      resolve();
    });
  });
  return promise;
}
render() {
  if (this.state.page === 1) {
    return (
      <div className="App">
        <Header username="" />
        <Login
          onTextChange={text => this.onTextChange(text)}
          saveUsername={() => this.onSubmit()}
          username={this.state.username}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header username={this.state.username} />
      <QuizBody user={this.state.userObj} updateUser={() => this.updateUser()} />
    </div>
  );
}
}

export default App;
