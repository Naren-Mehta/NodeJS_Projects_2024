const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;

    if(!token) {
        throw new Error("Token is not valid!");
    }

    // Validate the token
    const decodeMessage = await jwt.verify(token, "DEV@Tinder$1140");
    const { _id } = decodeMessage;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
};

module.exports = {
  userAuth,
};
