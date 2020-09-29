const ctrl = {};

ctrl.index = (req, res) => {
  console.log('run');
  res.send('Running');
};

module.exports = ctrl;
