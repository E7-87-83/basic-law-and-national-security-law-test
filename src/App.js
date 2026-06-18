import React, { Component } from 'react';
import allQuizQuestions from './api/quizQuestions'; // Rename source raw array
import Quiz from './components/Quiz';
import Result from './components/Result';
import SelectNumOfQs from './components/SelectNumOfQs';
import Landing from './components/Landing';
import basicDetail from './basicDetail.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choiceNum: 0,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      userAnswer: '',
      answersCount: {},
      correctCount: 0,
      correctOption: '',
      answer: '',
      result: false,
      numOfQs: 0,
      quizQuestionsList: []
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.handleSetNumOfQs = this.handleSetNumOfQs.bind(this);
    this.handleLandingSelection = this.handleLandingSelection.bind(this);
    this.handleJumpToQuestion = this.handleJumpToQuestion.bind(this);
  }

  handleLandingSelection(selectedValue) {
    const choiceNum = Number(selectedValue);
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    if (choiceNum < 0) {
      let slicedQuestions = allQuizQuestions;
      if (choiceNum === -2) {
        slicedQuestions = shuffleArray(slicedQuestions);
      }
      const correctOption = slicedQuestions.map(question => question.answers[question.correct]);
      const shuffledAnswerOptions = slicedQuestions.map(question => {
        return shuffleArray(question.answers);
      });

      this.setState({
        numOfQs: allQuizQuestions.length,
        quizQuestionsList: slicedQuestions,
        question: slicedQuestions[0].question,
        answerOptions: shuffledAnswerOptions[0],
        correctOption: correctOption[0],
        counter: 0,
        questionId: 1
      });
    } 
    this.setState({choiceNum: choiceNum});
  }

  handleSetNumOfQs(selectedValue) {
    const num = Number(selectedValue);
    
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    // Slice the full questions list to match the user's choice
    let slicedQuestions = allQuizQuestions.slice(0, num)
    slicedQuestions = shuffleArray(slicedQuestions);
    const correctOption = slicedQuestions.map(question => question.answers[question.correct]);
    const shuffledAnswerOptions = slicedQuestions.map(question => {
      return shuffleArray(question.answers);
    });

    this.setState({
      numOfQs: num,
      quizQuestionsList: slicedQuestions,
      question: slicedQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      correctOption: correctOption[0],
      counter: 0,
      questionId: 1
    });
  }

  handleAnswerSelected(event) {
    const selectedValue = event.target.value;

    this.setState({
      answer: selectedValue
    }, () => {
      const isCorrect = selectedValue === this.state.correctOption;
      this.setState(prevState => ({
        correctCount: isCorrect ? prevState.correctCount + 1 : prevState.correctCount
      }));
    });
  }

  handleNextQuestion() {
    if (this.state.questionId < this.state.quizQuestionsList.length) {
      this.setNextQuestion();
    } else {
      this.setState({ result: true });
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    const questions = this.state.quizQuestionsList;

    const nextCorrectIndex = questions[counter].correct;
    const nextCorrectOption = questions[counter].answers[nextCorrectIndex];
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    this.setState({
      counter: counter,
      questionId: questionId,
      question: questions[counter].question,
      answerOptions: shuffleArray(questions[counter].answers),
      correctOption: nextCorrectOption, 
      answer: '' 
    });
  }

handleJumpToQuestion(targetQuestionId) {
  const targetIndex = targetQuestionId - 1;
  const questions = this.state.quizQuestionsList;

  // Boundary check
  if (targetIndex < 0 || targetIndex >= questions.length) return;

  const targetCorrectIndex = questions[targetIndex].correct;
  const targetCorrectOption = questions[targetIndex].answers[targetCorrectIndex];
  
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  this.setState({
    counter: targetIndex,
    correctCount: 0,
    questionId: targetQuestionId,
    question: questions[targetIndex].question,
    answerOptions: shuffleArray(questions[targetIndex].answers),
    correctOption: targetCorrectOption, 
    answer: '' // Resets the selected answer choice for the new question
  });
}


  renderQuiz() {
    return (
      <Quiz
        choiceNum={this.state.choiceNum}
        correctCount={this.state.correctCount}
        correctOption={this.state.correctOption}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        answer={this.state.answer}
        questionTotal={this.state.numOfQs} 
        onAnswerSelected={this.handleAnswerSelected}
        onNextPressed={this.handleNextQuestion}
        onJumpToQuestion={this.handleJumpToQuestion}
      />
    );
  }

  renderResult() {
    return ( 
      <Result
        quizResult={this.state.correctCount}
	numOfQs={this.state.numOfQs}
      />
    );
  }

  renderSelection() {
    return (
      <SelectNumOfQs
        numOfQs={this.state.numOfQs}
        onConfirmPressed={this.handleSetNumOfQs}
      />
    );
  }

  renderLanding() {
    return (
      <Landing
        onConfirmPressed={this.handleLandingSelection}
      />
    );
  }


  render() {
    let view;
    if (this.state.choiceNum === 0) {
      view = this.renderLanding();
    } else if (this.state.numOfQs === 0) {
      view = this.renderSelection();
    } else if (this.state.result) {
      view = this.renderResult();
    } else {
      view = this.renderQuiz();
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={basicDetail.logoAbsPath} className="App-logo" alt="logo" />
          <h2>{basicDetail.title}</h2>
        </div>
        {view}
      </div>
    );
  }
}

export default App;
