import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Wizard from './Wizard.js'
import Captcha from './Captcha.js'
import QuestionComponent from './QuestionComponent.js'
import JobInput from './JobInput.js'
import TaskRating from './TaskRating.js'
import ResultPage from './ResultPage.js'
import AdminPage from './AdminPage.js'
import { Formik, Field } from 'formik';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    axios.get('http://127.0.0.1:5000/' + this.state.value)
    .then(response => console.log(response))
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
          <Wizard
            initialValues={{
              job: {},
              jobTitle: '',
              futuromatPotential: 0,
              question1: 2,
              question2: 2,
              question3: 2,
              question4: 2,
              captchaComplete: false,
              serverIP: '192.168.4.1'
            }}
            onSubmit={(values, actions) => {
              sleep(300).then(() => {
                console.log(JSON.stringify(values, null, 2));
              });
            }}
          >
            <Wizard.Page>
              <div>
                <h1>KIBA</h1>
                <p style={{ lineHeight: '2em' }}>V 0.1.0 ©️2018<br/>Int. KIBA Systems<br/>All systems ready!<span className="cursor">&#9608;</span></p>
                <Field
                  name="adminPage"
                  render={({ form: { values } }) =>
                  (<AdminPage values={values} />)}
                />
              </div>
            </Wizard.Page>
            <Wizard.Page>
              <div>
                <label>Was ist dein aktueller Beruf?</label>
                <Field
                  name="jobTitle"
                  render={({form: { setFieldValue }}) => (<JobInput onComplete={(job, jobTitle) => { setFieldValue('job', job); setFieldValue('jobTitle', jobTitle); }} />)}
                  type="text"
                  placeholder="Roboter"
                />
              </div>
            </Wizard.Page>
            <Wizard.Page>
              <Field
                name="taskRating"
                render={({ form: { values, setFieldValue } }) =>
                (<TaskRating values={ values } onComplete={(futuromatPotential) => { setFieldValue('futuromatPotential', futuromatPotential) }} />)}
              />
            </Wizard.Page>
            <Wizard.Page>
              <QuestionComponent name="question1"
              question="Ich kann mir vorstellen, mit Robotern zusammen zu arbeiten." />
            </Wizard.Page>
            <Wizard.Page>
              <QuestionComponent name="question2"
              question="Ich mag Veränderung in meinem Leben." />
            </Wizard.Page>
            <Wizard.Page>
              <QuestionComponent name="question3"
              question="Ich fühle mich wohl, wenn Menschen eine emotionale Reaktion von mir erwarten." />
            </Wizard.Page>
            <Wizard.Page>
              <QuestionComponent name="question4"
              question="Regeln ärgern mich." />
            </Wizard.Page>
            <Wizard.Page>
              <Field
                    name="captchaComplete"
                    render={({form: { setFieldValue }}) => (<Captcha onComplete={(response) => { setFieldValue('captchaComplete', response); }} />)}
                  />
            </Wizard.Page>
            <Wizard.Page>
              <Field
                name="resultPage"
                render={({ form: { values } }) =>
                (<ResultPage values={values} page="1" />)}
              />
            </Wizard.Page>
            <Wizard.Page>
              <Field
                name="resultPage"
                render={({ form: { values } }) =>
                (<ResultPage values={values} page="2" />)}
              />
            </Wizard.Page>
          </Wizard>
        </div>
    );
  }
}


export default App;