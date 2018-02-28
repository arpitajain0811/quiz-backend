import React from 'react';
import PropTypes from 'prop-types';
import './QuestionBox.css';


const QuestionBox = (props) => {
  const optionHolder = [];
  console.log(props.answers);
  //   const answers = props.user.answers.replace(/'/g, '"');
  //   const keys = Object.keys(JSON.parse(answers)).length;
  for (let i = 0; i < props.options.length; i += 1) {
    // for(let j=0;j<keys;j++){
    // if (Object.keys(JSON.parse(answers)) === this.props.questionId.toString()&&props.options[i]===);
    optionHolder.push(<div className="Radio">
      <input type="radio" value={props.options[i]} name="option" onClick={value => props.addAnswer(props.questionId, value.target.value)} />
      {props.options[i]}
                      </div>);
    // }
  }
  return (
    <div className="QuestionBox">
      <div className="QuestionNumber">Question {props.index + 1}</div>
      <div className="QuestionStatement">{props.question}</div>
      <div className="Options" />
      <form>
        {optionHolder}
      </form>
    </div>
  );
};
export default QuestionBox;
QuestionBox.propTypes = {
  question: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  options: PropTypes.objectOf.isRequired,
  //   user: PropTypes.objectOf.isRequired,
  questionId: PropTypes.number.isRequired,
  addAnswer: PropTypes.func.isRequired,
  answers: PropTypes.arrayOf.isRequired,
};
