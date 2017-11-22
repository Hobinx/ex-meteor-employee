import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import R from 'ramda';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // code to run on server at startup

  const numRecords = Employees.find({}).count();

  if (!numRecords) {
    R.times(() => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name, email, phone,
        avatar: image.avatar()
      });
    }, 5000);
  }

  Meteor.publish('employees', () => {
    return Employees.find({}, { limit: 20 });
  });
});
