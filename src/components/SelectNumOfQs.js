import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SelectNumOfQs(props) {
  const [selected, setSelected] = useState(false);

  const handleClickRadio = event => {
    setSelected(true);
  };

  const handleClick = event => {
    const checkedRadio = document.querySelector("input[name='numOfQs']:checked");
    if (checkedRadio) {
      const numOfQs = parseInt(checkedRadio.value, 10);
      if (numOfQs > 0) {
         props.onConfirmPressed(numOfQs);
      }
    }
  };

  return (
    <div className="container">
      <ul className="answerOptions">
	<li className="numOfQsOption">
        <input className="radioMyButton" type="radio" name="numOfQs" id="_20" value="20" onClick={handleClickRadio} />
        <label className="radioMyLabel" htmlFor="_20">20</label>
	</li>
        
	<li className="numOfQsOption">
        <input className="radioMyButton" type="radio" name="numOfQs" id="_30" value="30" onClick={handleClickRadio} />
        <label className="radioMyLabel" htmlFor="_30">30</label>
	</li>
        
	<li className="numOfQsOption">
        <input className="radioMyButton" type="radio" name="numOfQs" id="_40" value="40" onClick={handleClickRadio} />
        <label className="radioMyLabel" htmlFor="_40">40</label>
	</li>
      </ul>
      <div className="quizFooter">
        <div>問題數目選擇
	   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
	</div>
        <button 
          className=""
          onClick={handleClick}
          disabled={!selected}
        >
          {"Start Quiz"}
        </button>
      </div>
    </div>
  );
}

SelectNumOfQs.propTypes = {
  onConfirmPressed: PropTypes.func.isRequired,
  numOfQs: PropTypes.number.isRequired
};

export default SelectNumOfQs;
