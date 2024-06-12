const handlingError = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err,
  });
  next();
};

module.exports = { handlingError };
