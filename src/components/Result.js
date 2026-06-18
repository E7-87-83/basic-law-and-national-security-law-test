import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function Result(props) {
  const nodeRef = createRef(null);
  return (
    <TransitionGroup className="container" component="div">
      <CSSTransition
        key={props.questionId}
        nodeRef={nodeRef} // 2. Tells CSSTransition exactly which DOM node pointer to trace
        classNames="fade" 
        timeout={{ enter: 600, exit: 500 }} 
        appear={true}
      >
        {/* 3. Bind the standard 'ref' prop to our native <div> element. Do NOT use 'nodeRef' here. */}
        <div ref={nodeRef}>
          You got <strong>{props.quizResult}</strong> correct answer(s) out of {props.numOfQs}. That is, <strong>{Math.floor((Number(props.quizResult) / props.numOfQs) * 100)}%</strong>.
        </div>
      </CSSTransition>
    </TransitionGroup>
   );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
  numOfQs: PropTypes.number.isRequired
};

export default Result;
