const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    req.fullname = decoded.fullname;
    req.username = decoded.username;
    req.email = decoded.email;
    req.avatarUrl = decoded.avatarUrl;
    req.balance = decoded.balance;
    req.habitName = decoded.habitName;
    req.savingsPercentage = decoded.savingsPercentage;
    req.wantsPercentage = decoded.wantsPercentage;
    req.needsPercentage = decoded.needsPercentage;
    next();
  });
};

module.exports = { verifyToken };
