const submitQuiz = async (req, res, next) => {
  try {
    const { answer } = req.body;
    if (!answer) return res.send(400);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitQuiz };
