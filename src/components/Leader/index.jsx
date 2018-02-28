import React from 'react';
import PropTypes from 'prop-types';
import './Leader.css';


const Leader = (props) => {
  if (props.thisUser === 'true') {
    return (
      <div className="MeLeader">
        <div className="Sno">{props.sno}.</div>
        <div className="LeaderName">{props.name}</div>
        <div className="LeaderScore">{props.score}</div>
      </div>
    );
  }

  return (
    <div className="Leader">
      <div className="Sno">{props.sno}.</div>
      <div className="LeaderName">{props.name}</div>
      <div className="LeaderScore">{props.score}</div>
    </div>
  );
};
export default Leader;
Leader.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  sno: PropTypes.number.isRequired,
  thisUser: PropTypes.string.isRequired,
};
