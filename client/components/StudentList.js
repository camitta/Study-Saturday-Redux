import React from 'react';
import { fetchStudents } from '../redux/store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StudentList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadStudents();
	}

	pickStudent(studentId) {
		return async () => {
			const { data } = await axios.get(`api/students/${studentId}`);
			this.setState({
				selectedStudent: data
			});
		};
	}

	render() {
		return (
			<ul>
				{this.props.students.map(student => (
					<li key={student.id}>
						<div>
							<p>Name: {student.fullName}</p>
							<p>Email: {student.email}</p>
							<Link to={`/students/${student.id}`}>
								<p>View Detail</p>
							</Link>
						</div>
					</li>
				))}
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	students: state.students
});

const mapDispatchToProps = dispatch => ({
	loadStudents: () => dispatch(fetchStudents())
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
