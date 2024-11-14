const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // will pass the error into the next func: global err handling
  };
};

module.exports = catchAsync;
