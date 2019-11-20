import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import uuid from 'uuid';

const transitionDuration = 200;
const transitionDelay = 250;

const Transition = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: transitionDuration },
    delay: transitionDelay,
    beforeChildren: true,
  },
  exit: { opacity: 0, transition: { duration: transitionDuration } },
});

const PageTransition = ({ children, location }) => (
  <>
    <div>
      <PoseGroup>
        <Transition key={location ? location.pathname : uuid()}>
          {children}
        </Transition>
      </PoseGroup>
    </div>
  </>
);

export default PageTransition;
