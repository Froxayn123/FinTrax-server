const db = require("../configs/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../email/sendEmail");

const register = async (req, res, next) => {
  try {
    const { fullname, username, phone_number, email, password, confPassword } = req.body;

    if (!fullname || !username || !phone_number || !email || !password || !confPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Received Data:", req.body); // Log data yang diterima

    if (password !== confPassword) {
      return res.status(400).json({ message: "Password and Confirm Password don't match" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const authToken = jwt.sign({ fullname, username, phone_number, email, hashPassword }, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: "2m",
    });
    const link = `${process.env.BASE_URL}/register/confirm/${authToken}`;
    await sendEmail(email, "Verify Your Email Address for FinTrax", link, fullname);

    res.status(201).json({
      payload: {
        message: "Email Verification link sent to your email",
      },
    });
  } catch (error) {
    next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.fullname = decoded.fullname;
      req.username = decoded.username;
      req.phone_number = decoded.phone_number;
      req.email = decoded.email;
      req.hashPassword = decoded.hashPassword;

      console.log("Decoded Token Data:", decoded);

      const fullname = req.fullname;
      const username = req.username;
      const phone_number = req.phone_number;
      const email = req.email;
      const hashPassword = req.hashPassword;

      const [checkuser] = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
      if (checkuser.length !== 0) return res.status(400).json({ message: "Email is already verified" });

      await db.query(
        `INSERT INTO users (id, fullname, email, password, phone_number, username, refresh_token, email_verified_at, created_at, updated_at) VALUES (UUID(), '${fullname}', '${email}', '${hashPassword}', '${phone_number}', '${username}', '${token}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`
      );

      return res.status(200).json({
        payload: {
          message: "Email has been successfully verified",
        },
      });
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Debugging: Log received email and password
    console.log("Received Email:", email);
    console.log("Received Password:", password);

    // Query the database for the user by email
    const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

    // Debugging: Log the retrieved user data
    console.log("Retrieved User Data:", user);

    // Check if user exists
    if (!user || user.length === 0) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const storedPasswordHash = user[0].password;

    // Debugging: Log stored password hash
    console.log("Stored Password Hash:", storedPasswordHash);

    // Compare the provided password with the stored hash
    const match = await bcrypt.compare(password, storedPasswordHash);

    // Debugging: Log password comparison result
    console.log("Password Match:", match);

    if (!match) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const userId = user[0].id;
    const fullname = user[0].fullname;
    const username = user[0].username;

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId, fullname, username, email: user[0].email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

    const refreshToken = jwt.sign({ userId, fullname, username, email: user[0].email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

    // Update the user's refresh token in the database
    await db.query(`UPDATE users SET refresh_token = ? WHERE id = ?`, [refreshToken, userId]);

    // Set the refresh token in the cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send the access token to the client
    res.json({ accessToken });
  } catch (error) {
    // Log any errors
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const [user] = await db.query(`SELECT * FROM users WHERE refresh_token = '${refreshToken}';`);
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await db.query(`UPDATE users SET refresh_token = null WHERE id = '${userId}';`);
    res.clearCookie("refreshToken");
    return res.status(200).json({ payload: { message: "You have successfully logged out" } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, logout, confirmEmail };
