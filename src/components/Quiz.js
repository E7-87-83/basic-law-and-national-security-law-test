import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; 
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  const textToCopy = "Q. "+props.question
		+"\n"
		+"Option:\n"
		+props.answerOptions.join("\n")
		+"\n\nCorrect:\n"
		+props.correctOption+"\n";

  // Slider change handler
  const handleSliderChange = (event) => {
    const targetId = Number(event.target.value);
    props.onJumpToQuestion(targetId);
  };

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
  const nodeRef = createRef(null);
  const displayAtt = props.choiceNum == -1 ? 'visible' : 'none';

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
          <QuestionCount counter={props.questionId} total={props.questionTotal} correctCount={props.correctCount} />
          <Question content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map((option) => renderAnswerOptions(option, props.answer))}
          </ul>
          
          <div className="quizFooter">
            
            <div className="sliderContainer" style={{ margin: '0', textAlign: 'left' , display: displayAtt}}
	    >
              <label htmlFor="question-slider" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Jump to Question: {props.questionId} / {props.questionTotal}
              </label>
              <input 
                id="question-slider"
                type="range" 
                min="1" 
                max={props.questionTotal} 
                value={props.questionId} 
                onChange={handleSliderChange}
                style={{ width: '80%', maxWidth: '400px', cursor: 'pointer' }}
              />
            </div>

            <button 
              className="nextButton"
              onClick={props.onNextPressed}
              disabled={props.answer === ''}
            >
              {isLastQuestion ? "View Results" : "Next Question"}
            </button>
	    &nbsp;
	    <button
	      className="copyButton"
	      onClick={() => {navigator.clipboard.writeText(textToCopy)}}
              disabled={props.answer === ''}
	    >
	      {"Copy Text"}
	    </button>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}


Quiz.propTypes = {
  choiceNum: PropTypes.number.isRequired,
  correctCount: PropTypes.number.isRequired,
  correctOption: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  onNextPressed: PropTypes.func.isRequired,
  answer: PropTypes.string,
  onJumpToQuestion: PropTypes.func.isRequired
};

export default Quiz;
