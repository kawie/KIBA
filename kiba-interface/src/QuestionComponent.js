import React from 'react';
import { Formik, Field } from 'formik';

import SmileIcon from './smile.svg';
import FrownIcon from './frown.svg';

class QuestionComponent extends React.Component {
  render() {
    return (
      <div>
        <label>{ this.props.question }</label>
        <Field
          name={ this.props.name }
          component="input"
          type="range"
          min="-6"
          max="6"
          step="4"
        />
        <img src={ FrownIcon } className="icon" style={{ float: 'left' }} />
        <img src={ SmileIcon } className="icon" style={{ float: 'right' }} />
      </div>
    );
  }
}

export default QuestionComponent;