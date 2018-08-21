import React, { Component } from 'react';
import { Field } from 'formik';
import axios from 'axios';

class AdminPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			adminOpen: false
		}
	}

	toggleAdmin() {
		this.setState({
		  adminOpen: !this.state.adminOpen
		})
	}

	render() {
		return (
		<div>
			<div style={{margin: '50px auto', opacity: '0'}}>
			  <label>
			    <input type="checkbox" onClick={ () => this.toggleAdmin()} />
			    <span className="checkmark"></span>
			  </label>
			</div>

			{this.state.adminOpen &&
			<div className="captchaBox">
				<Field name="serverIP" />
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/reset') }}>Reset</button>
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/clean') }}>Clean</button><br />
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/lights/on') }}>Lights on</button>
				<button type="button" onClick={() => { axios.get('http://' + this.props.values.serverIP + ':5000/kiba/lights/off') }}>Lights off</button>
			</div>
			}
		</div>
		)
	}
}

export default AdminPage;