/* global use, db */
// above line defines globals that we can use in the rest of the script
// db to use
use('blog-simulated')
// get events collection
db.getCollection('events').aggregate([
  // filter to only start events
  {
    $match: { action: 'startView' },
  },
  // group on post id, and apply count function to create 'views' value
  {
    $group: {
      _id: `$post`,
      views: { $count: {} },
    },
  },
])
