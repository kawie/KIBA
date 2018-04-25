import React from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';

class TaskRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    }
  }

  componentDidMount() {
    axios.get('http://' + this.props.values.serverIP + ':5000/jobdata/' + this.props.values.job.id)
      .then((response) => {
        console.log(response)
        const skills = response.data.skills.map(obj => ({id: obj.id, name: obj.skill, replaceable: obj.replaceable}));
        this.setState({ skills });
        this.props.onComplete(response.data.potential);
      })
      .catch(function (error) {
        console.log(error);
        const skills = [];
        this.setState({ skills });
      });
  }

  render() {
    return (
      <div>
        <h2>Wie gern möchtest du diese Aufgaben in Zukunft selbst erledigen?</h2>
          {this.state.skills.map(skill =>
            <div key={skill.id}>
              <label>{skill.name}</label>
              <Field
                name={"skill" + skill.id}
                component="input"
                type="range"
                step="25"
              />
            </div>
          )}
      </div>
    );
  }
}

export default TaskRating;