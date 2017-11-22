import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';
import { Meteor } from 'meteor/meteor';

const PER_PAGE = 20;

class EmployeeList extends Component {

  componentWillMount() {
    this.page = 1;
  }

  onLoadClick() {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  render() {
    const { employees } = this.props;
    return (
      <div>
        <div className="employee-list">
          {
            employees.map(employee =>
              <EmployeeDetail key={employee._id} employee={employee} />
            )
          }
        </div>
        <button onClick={this.onLoadClick.bind(this)}
                className="btn btn-primary">Load More...</button>
      </div>
    );
  }
}

export default withTracker(props => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);

  // return an object, Whatever we return will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
})(EmployeeList);