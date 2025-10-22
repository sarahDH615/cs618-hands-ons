/* global use, db */
use('blog-simulated')

db.getCollection('events').aggregate([
  // select only start views
  {
    $match: {
      action: 'startView',
    },
  },
  // create new day field (includes month and year within it)
  {
    $project: {
      post: `$post`,
      day: { $dateTrunc: { date: `$date`, unit: 'day' } },
    },
  },
  // group by day
  {
    $group: {
      _id: { post: `$post`, day: `$day` },
      views: {
        $count: {},
      },
    },
  },
])
