import React from 'react';
import PropTypes from 'prop-types';
import './QuestionBox.css';


const QuestionBox = (props) => {
  const optionHolder = [];
  //   let flag = 0;
  let selectedValue = '';
  console.log(props.answers);
  for (let j = 0; j < props.answers.length; j += 1) {
    // console.log(typeof (Object.keys(props.answers[j])[0]));
    // console.log(typeof (props.questionId));
    const qId = props.questionId.toString();
    if (Object.keys(props.answers[j])[0] === qId) {
    //   flag = 1;
      selectedValue = props.answers[j][qId];
      console.log('selected', selectedValue);
      break;
    }
  }
  for (let i = 0; i < props.options.length; i += 1) {
    if (props.options[i] === selectedValue) {
      optionHolder.push(<div className="Radio">
        <input type="radio" checked value={props.options[i]} name="option" onClick={value => props.addAnswer(props.questionId, value.target.value)} />
        {props.options[i]}
                        </div>);
    } else {
      optionHolder.push(<div className="Radio">
        <input type="radio" value={props.options[i]} name="option" onClick={value => props.addAnswer(props.questionId, value.target.value)} />
        {props.options[i]}
      </div>);
    }
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
