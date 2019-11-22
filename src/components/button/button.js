import React from 'react';
import PropTypes from 'prop-types';
import { button } from './button.module.scss';

const Button = ({ text, click, to }) => (
  <button
    to={to ? to : null}
    onClick={click ? () => click() : null}
    className={button}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  click: PropTypes.func,
  to: PropTypes.string
};

export default Button;
