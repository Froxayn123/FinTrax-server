const handlingError = (error, req, res, next) => {
  console.log(error.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: error,
  });
  next();
};

module.exports = { handlingError };
