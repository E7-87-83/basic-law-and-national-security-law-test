import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; 
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  function renderAnswerOptions(key, currentSelection) {
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        correctCount={props.correctCount}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
        selectedAnswer={currentSelection}
        correctOption={props.correctOption}
      />
    );
  }

  const isLastQuestion = props.questionId === props.questionTotal;
  
  // 1. Create a persistent DOM node reference mapping for this specific question view mount
  const nodeRef = createRef(null);

  return (
    <TransitionGroup className="container" component="div">
      <CSSTransition
        key={props.questionId}
        nodeRef={nodeRef}
        classNames="fade"
        timeout={{ enter: 500, exit: 300 }} 
        appear={true}
      >
        <div ref={nodeRef}>
          <QuestionCount counter={props.questionId} total={props.questionTotal} />
          <Question content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map((option) => renderAnswerOptions(option, props.answer))}
          </ul>
          
          <div className="quizFooter">
            <button 
              className="nextButton"
              onClick={props.onNextPressed}
              disabled={props.answer === ''}
            >
              {isLastQuestion ? "View Results" : "Next Question"}
            </button>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

Quiz.propTypes = {
  correctCount: PropTypes.number.isRequired,
  correctOption: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  onNextPressed: PropTypes.func.isRequired,
  answer: PropTypes.string
};

export default Quiz;
