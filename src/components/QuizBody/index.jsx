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
    };
  }
  componentDidMount() {
    // console.log(this.props.user.answers);
    let answersArray = [];
    console.log(this.props.user.answers);
    const userName = JSON.stringify(this.props.user.answers);
    if (userName !== JSON.stringify({})) {
      // console.log(this.props.user.answers);
      // const answers = this.props.user.answers.replace(/'/g, '"');
      const userAnswers = this.props.user.answers;
      // const keys = Object.keys(JSON.parse(answers)).length;
      // const keys = userAnswers.length;
      // for (let i = 0; i < keys; i += 1) {
      // answersArray.push(JSON.parse(answers));
      answersArray = userAnswers;
      // }
    } else { answersArray = []; }
    const promise = this.checkDb();
    promise.then((response) => {
      // console.log(response);
      if (response.message === 'empty') { this.getQuestions(answersArray); } else {
        this.setState({
          questions: response.result,
          answers: answersArray,
        });
      }
    });
  }

  gettingUpdated=() => {
    // const answers = this.props.user.answers.replace(/'/g, '"');
    const userAnswers = this.props.user.answers;
    let answersArray = [];
    // const keys = userAnswers.length;
    // const keys = Object.keys(JSON.parse(answers)).length;
    // for (let i = 0; i < keys; i += 1) {
    answersArray = userAnswers;
    // answersArray.push(JSON.parse(answers));
    // }
    // const promise = this.checkDb();
    // promise.then((response) => {
    //   console.log(response);
    //   if (response.message === 'empty') { this.getQuestions(answersArray); } else {
    this.setState({
      // questions: response.result,
      answers: answersArray,
    });
    //   }
    // });
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
      const response = this.putUserAnswers(answerArray);
      response.then(() => {
        console.log(response);
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
    const responsePromise = this.putUserAnswers(newAnswers);
    responsePromise.then(() => {
      this.props.updateUser().then(() => {
        // console.log('2');
        this.gettingUpdated();

        // console.log('new', this.state.answers);
      });
    });

    // this.gettingUpdated();
    console.log('new', this.state.answers);
    // this.setState({
    //   answers: newAnswers.push(answerObj),
    // });
  }
}
putUserAnswers=(answerArray) => {
  console.log('please', answerArray);
  const promise = new Promise((resolve) => {
    fetch('/user', {
      body: JSON.stringify({
        username: this.props.user.username,
        score: 0,
        totalScore: this.state.questions.length,
        answers: answerArray,
      }),
      method: 'PATCH',
    }).then(response => resolve(response));
  });
  return promise;
}
render() {
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
        {questionHolder}
        <button>Calculate</button>
      </div>
    );
  } return null;
}
}
export default QuizBody;
QuizBody.propTypes = {
  user: PropTypes.objectOf.isRequired,
  updateUser: PropTypes.func.isRequired,
};
