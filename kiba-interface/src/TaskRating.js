import React from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';

import SmileIcon from './smile.svg';
import RoboSmileIcon from './robosmile.svg';

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
      .catch((error) => {
        const skills = [{"id":123455,"name":"Organisatorisches / Planerisches","replaceable":true},{"id":123456,"name":"Praktisches / Kreatives","replaceable":true},{"id":123457,"name":"Theoretisches / Strategisches","replaceable":true}];
        this.setState({ skills });
        console.log(error);
      });
  }

  render() {
    if(this.state.skills.length > 0) {
      return (
        <div>
          <p>Wie gern möchtest du folgende Aufgaben in Zukunft selbst erledigen?</p>
            {this.state.skills.map(skill =>
              <div key={skill.id}>
                <label>{skill.name}</label>
                <div style={{clear: 'both', width:'100%', display: 'inline-block', marginBottom: '-30px'}}>
                  <img src={ SmileIcon } className="icon iconSmall" style={{ float: 'left' }} />
                  <img src={ RoboSmileIcon } className="icon iconSmall" style={{ float: 'right' }} />
                </div>
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
    } else {
      return(
        <div>
          <h2>Beim Laden der Aufgaben ist ein Fehler aufgetreten.</h2>
          <p>Wahrscheinlich ist <pre>KIBA-Backend</pre> nicht erreichbar.</p>
        </div>
      );
    }
  }
}

export default TaskRating;