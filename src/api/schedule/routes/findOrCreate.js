module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/schedules/find-or-create',
      handler: 'schedule.findOrCreate'
    }
  ]
};