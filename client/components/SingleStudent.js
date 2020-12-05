import React from 'react';
import { fetchSingleStudent } from '../redux/store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const avgGrade = tests => {
	return Math.round(tests.map(test => test.grade).reduce((x, y) => x + y) / tests.length);
};

// const DUMMY_DATA = {
// 	id: 1,
// 	fullName: 'Student McDummydata',
// 	firstName: 'Student',
// 	lastName: 'McDummydata',
// 	email: 'sm@dummydata.com',
// 	tests: [
// 		{
// 			id: 1,
// 			subject: 'Computer Science',
// 			grade: 45
// 		},
// 		{
// 			id: 6,
// 			subject: 'Art',
// 			grade: 60
// 		},
// 		{
// 			id: 12,
// 			subject: 'ullam',
// 			grade: 45
// 		}
// 	]
// };

class SingleStudent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		try {
			console.log('!!!!this', this);
			console.log('this.props', this.props);
			console.log(this.props.match.params.id);
			this.props.loadSingleStudent(this.props.match.params.id);
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { student } = this.props;
		console.log('!!!!!! should be student', this.props);
		console.log('!!!!!!', this.props.match.params.id);
		const hasTests = student.tests.length;

		return (
			<div>
				<h3>Detail: {student.fullName}</h3>
				{hasTests ? (
					<React.Fragment>
						<h3>Average grade: {avgGrade(student.tests)}%</h3>
						<div>
							<table>
								<thead>
									<tr>
										<th>Subject</th>
										<th>Grade</th>
									</tr>
								</thead>
								<tbody>
									{this.props.student.tests.map(test => {
										return (
											<tr key={test.id}>
												<td>{test.subject}</td>
												<td>{test.grade}%</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</React.Fragment>
				) : (
					<h4>No tests on record.</h4>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		student: state.singleStudent
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadSingleStudent: id => dispatch(fetchSingleStudent(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
