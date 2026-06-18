import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SelectNumOfQs(props) {
  const [selected, setSelected] = useState(false);

  const handleClickRadio = event => {
    setSelected(true);
  };

  const handleClick = event => {
    const checkedRadio = document.querySelector("input[name='modeChoice']:checked");
    if (checkedRadio) {
      const modeChoice = parseInt(checkedRadio.value, 10);
      if (modeChoice !== 0) {
         props.onConfirmPressed(modeChoice);
      }
    }
  };

  return (
    <div className="container">
      <ul className="answerOptions">
	<li className="numOfQsOption">
        <input className="radioMyButton" type="radio" name="modeChoice" id="revision1" value="-1" onClick={handleClickRadio} />
        <label className="radioMyLabel" htmlFor="revision1">溫習模式（順序出題）</label>
	</li>

	<li className="numOfQsOption">
        <input className="radioMyButton" type="radio" name="modeChoice" id="revision2" value="-2" onClick={handleClickRadio} />
        <label className="radioMyLabel" htmlFor="revision2">溫習模式（隨機出題）</label>
	</li>
        
	<li className="numOfQsOption">
        <input className="radioMyButton" type="radio" name="modeChoice" id="exam" value="1" onClick={handleClickRadio} />
        <label className="radioMyLabel" htmlFor="exam">考試模式</label>
	</li>
      </ul>
      <div className="quizFooter">
        <div>模式選擇
	   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
	</div>
        <button 
          className=""
          onClick={handleClick}
          disabled={!selected}
        >
          {"Next / Start Quiz"}
        </button>
      </div>
    </div>
  );
}

SelectNumOfQs.propTypes = {
  onConfirmPressed: PropTypes.func.isRequired,
};

export default SelectNumOfQs;
