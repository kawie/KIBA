import React from 'react';
import { Formik, Field } from 'formik';

class Wizard extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag, initialValues) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      var lastValues = values;
      this.setState(state => ({
        page: 0,
      }));
      bag.resetForm();
      bag.setValues(this.props.initialValues);
      bag.setFieldValue('serverIP', lastValues.serverIP);
      return onSubmit(lastValues);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className={ "formPage page" + page }>{activePage}</div>
            <div className="progress">Schritt { page + 1 } / 10</div>
            <div className="buttons" style={{width: '560px', margin: '10px auto 0 auto'}}>
              {page > 0 && (
                <button type="button" style={{float: 'left'}} onClick={this.previous}>
                  « ZURÜCK
                </button>
              )}

              {!isLastPage && <button type="submit" style={{float: 'right'}}>WEITER »</button>}
              {isLastPage && (
                <button type="submit" style={{float: 'right'}} disabled={isSubmitting}>
                  FERTIG!
                </button>
              )}
            </div>

            <pre style={{display: 'none'}}>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

export default Wizard;