import React, { Component } from 'react';
import { Field } from 'formik';
import axios from 'axios';

class AdminPage extends Component {
	render() {
		return (
			<div>
				<Field name="serverIP" />
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/reset') }}>Reset</button>
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/clean') }}>Clean</button><br />
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/lights/on') }}>Lights on</button>
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/lights/off') }}>Lights off</button>
			</div>
		)
	}
}

export default AdminPage;