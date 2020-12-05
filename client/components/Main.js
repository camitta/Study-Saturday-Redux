import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent';

import { fetchStudents } from '../redux/store';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<h1>Student Dashboard</h1>
				</div>

				<Switch>
					<Route exact path='/' component={StudentList} />
					<Route path='/students/:id' component={SingleStudent} />
				</Switch>
			</Router>
		);
	}
}
