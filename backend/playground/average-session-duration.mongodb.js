/* global use, db */
use('blog-simulated')

db.getCollection('events').aggregate([
  // create new start date and end date fields
  // with project, only fields specified within it get passed to the next step
  // so session needs to be specified here, despite not being used til later
  {
    $project: {
      session: `$session`,
      startDate: {
        $cond: [{ $eq: [`$action`, 'startView'] }, `$date`, undefined],
      },
      endDate: {
        $cond: [{ $eq: [`$action`, 'endView'] }, `$date`, undefined],
      },
    },
  },
  // group on session id and get min and max start and end date values
  // session is stored as '_id' here
  {
    $group: {
      _id: `$session`,
      startDate: {
        $min: `$startDate`,
      },
      endDate: {
        $max: `$endDate`,
      },
    },
  },
  // create duration field using start and end date values
  // session is stored as session from '$_id'
  {
    $project: {
      session: `$_id`,
      duration: { $subtract: [`$endDate`, `$startDate`] },
    },
  },
  // output will be in milliseconds
])
