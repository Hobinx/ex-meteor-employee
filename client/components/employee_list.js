import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';

const EmployeeList = (props) => {
  console.log(props.employees);
  return (
    <div>
      <div className="employee-list">
        Employee List
      </div>
    </div>
  );
};

export default withTracker(props => {
  // set up subscription
  Meteor.subscribe('employees', props.employees);

  // return an object, Whatever we return will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
})(EmployeeList);