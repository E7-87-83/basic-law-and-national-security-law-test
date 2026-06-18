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
      console.log(numOfQs);
      if (numOfQs > 0) {
         // FIX: Pass the parsed integer value to the parent callback!
         props.onConfirmPressed(numOfQs);
      }
    }
  };

  return (
    <div>
      <div>
        <input type="radio" name="numOfQs" id="_20" value="20" onClick={handleClickRadio} />
        <label htmlFor="_20">20</label>
        
        <input type="radio" name="numOfQs" id="_30" value="30" onClick={handleClickRadio} />
        <label htmlFor="_30">30</label>
        
        <input type="radio" name="numOfQs" id="_40" value="40" onClick={handleClickRadio} />
        <label htmlFor="_40">40</label>
      </div>
      <div className="quizFooter">
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
