import React from 'react';
import { Formik, Field } from 'formik';

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
      </div>
    );
  }
}

export default QuestionComponent;