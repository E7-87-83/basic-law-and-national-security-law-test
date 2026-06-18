import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
  const isSelected = props.answerContent === props.selectedAnswer;
  const isCorrectOption = props.answerContent === props.correctOption;
  const hasAnyAnswerBeenSelected = props.selectedAnswer !== '';

  let statusClass = "radioCustomButton";

  // Only apply colors/symbols after the user has made a choice
  if (hasAnyAnswerBeenSelected) {
    if (isCorrectOption) {
      // The correct option always gets marked with the 'correct' class (blue tick)
      statusClass += " correct";
    } else if (isSelected && !isCorrectOption) {
      // If the user selected this option and it's wrong, give it the 'wrong' class (red cross)
      statusClass += " wrong";
    }
  }

  return (
    <li className="answerOption">
      <input
        type="radio"
        className={statusClass}
        name="radioGroup"
        id={props.answerContent}
        value={props.answerContent}
        checked={isSelected}
        disabled={hasAnyAnswerBeenSelected} // Lock inputs after selection
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answerContent}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.string,
  correctOption: PropTypes.string.isRequired,
  correctCount: PropTypes.number
};

export default AnswerOption;
