import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './QuizBody.css';
import QuestionBox from '../QuestionBox';

class QuizBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      allAnswered: false,
    };
  }
  componentDidMount() {
    let answersArray = [];
    const userName = JSON.stringify(this.props.user.answers);
    if (userName !== JSON.stringify({})) {
      const userAnswers = this.props.user.answers;
      answersArray = userAnswers;
    } else { answersArray = []; }
    const promise = this.checkDb();
    promise.then((response) => {
      if (response.message === 'empty') { this.getQuestions(answersArray); } else {
        this.setState({
          questions: response.result,
          answers: answersArray,
        });
      }
    });
  }

  gettingUpdated=() => {
    const userAnswers = this.props.user.answers;
    let answersArray = [];
    answersArray = userAnswers;
    this.setState({
      answers: answersArray,
    });
  }
getQuestions=(answersArray) => {
  fetch('/questions', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    response.json()
      .then((responseObj) => {
        if (responseObj.message === 'Books added to database') {
          fetch('/questions/local').then(res => res.json())
            .then((responseBody) => {
              this.setState({
                questions: responseBody.result,
                answers: answersArray,
              });
            });
        }
      });
  });
}
checkDb = () => {
  const promise = new Promise((resolve) => {
    fetch('/questions/local').then(response => response.json())
      .then((responseArray) => {
        resolve(responseArray);
      });
  });
  return promise;
};
addAnswer=(id, value) => {
  let flag = 0;
  for (let i = 0; i < this.state.answers.length; i += 1) {
    if (id.toString() === Object.keys(this.state.answers[i])[0]) {
      flag = 1;
      const answerArray = this.state.answers;
      const key = Object.keys(this.state.answers[i])[0];
      answerArray[i][key.toString()] = value;
      const response = this.putUserAnswers(answerArray, 0);
      response.then(() => {
      });
      this.setState({
        answers: answerArray,
      });
    }
  }
  if (flag === 0) {
    const answerObj = {};
    answerObj[id] = value;
    const newAnswers = this.state.answers;
    newAnswers.push(answerObj);
    const responsePromise = this.putUserAnswers(newAnswers, 0);
    responsePromise.then(() => {
      this.props.updateUser().then(() => {
        this.gettingUpdated();
      });
    });
    console.log('new', this.state.answers);
  }
}
putUserAnswers=(answerArray, userScore) => {
  console.log('please', answerArray);
  const promise = new Promise((resolve) => {
    fetch('/user', {
      body: JSON.stringify({
        username: this.props.user.username,
        score: userScore,
        totalScore: this.state.questions.length,
        answers: answerArray,
      }),
      method: 'PATCH',
    }).then(response => resolve(response));
  });
  return promise;
}

calculateScore=() => {
  console.log(this.state.questions);
  console.log(this.state.answers);
  let score = 0;
  for (let i = 0; i < this.state.questions.length; i += 1) {
    const qId = this.state.questions[i].questionid.toString();
    for (let j = 0; j < this.state.answers.length; j += 1) {
      const key = Object.keys(this.state.answers[j])[0];
      if (key === qId && this.state.questions[i].answer === this.state.answers[j][key]) { score += 1; }
    }
  }
  const promise = this.putUserAnswers(this.state.answers, score);
  promise.then(() => {
    this.props.displayScore(score);
  });
}
render() {
  if (this.state.questions.length !== 0 && this.state.questions.length === this.state.answers.length && this.state.allAnswered === false) {
    this.setState({
      allAnswered: true,
    });
  }
  if (this.state.questions.length !== 0) {
    const questionHolder = [];
    for (let i = 0; i < this.state.questions.length; i += 1) {
      questionHolder.push(<QuestionBox
        index={i}
        question={this.state.questions[i].question}
        questionId={this.state.questions[i].questionid}
        answer={this.state.questions[i].answer}
        options={this.state.questions[i].options}
        user={this.props.user}
        addAnswer={(id, value) => this.addAnswer(id, value)}
        answers={this.state.answers}

      />);
    }
    return (
      <div className="QuizBody" >
        <div className="QuestionHolder">{questionHolder}</div>
        <div className="Calculate">
          <button
            className="CalculateBtn"
            disabled={!this.state.allAnswered}
            onClick={() => { this.calculateScore(); }}
          >Calculate
          </button>
        </div>
      </div>
    );
  } return null;
}
}
export default QuizBody;
QuizBody.propTypes = {
  user: PropTypes.objectOf.isRequired,
  updateUser: PropTypes.func.isRequired,
  displayScore: PropTypes.func.isRequired,
};
