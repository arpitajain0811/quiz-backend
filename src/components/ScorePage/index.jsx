import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Leader from '../Leader';
import './ScorePage.css';

class ScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      leaders: [],
    };
  }
  componentDidMount() {
    const leaderHolder = [];
    fetch('/users').then(response => response.json()).then((respJson) => {
      console.log(respJson);
      let limit = 5;
      if (respJson.length < 5) { limit = respJson.length; }
      for (let i = 0; i < limit; i += 1) {
        if (respJson[i].username === this.props.username) {
          leaderHolder.push(<Leader
            name={respJson[i].username}
            score={respJson[i].score}
            thisUser="true"
            sno={i}
          />);
        } else {
          leaderHolder.push(<Leader
            name={respJson[i].username}
            score={respJson[i].score}
            thisUser="false"
            sno={i}
          />);
        }
      }
      console.log('set');
      this.setState({
        done: true,
        leaders: leaderHolder,
      });
    });
  }

  render() {
    if (this.state.done === true) {
      return (
        <div className="ScorePage">
          <div className="ScoreBox">
            <div className="YourScore">Your Score</div>
            <div className="Score"><span className="userScore">{this.props.score}</span>/10</div>
          </div>
          <div className="LeaderBoard">
            <div className="LeaderHeading">Leaderboard</div>
            <div className="LeadersContainer">{this.state.leaders}</div>
          </div>
          <div className="PlayAgain"><button className="PlayBtn" onClick={() => { this.props.logout(); }}>Play Again</button></div>

        </div>
      );
    }
    return null;
  }
}


export default ScorePage;
ScorePage.propTypes = {
  logout: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};
