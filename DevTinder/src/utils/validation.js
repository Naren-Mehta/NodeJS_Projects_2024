const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  //   if(firstName.length <2 || firstName.length > 50) {
  //     throw new Error('Firstname should be 2 to 50 characters');
  //   }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

module.exports = { validateSignUpData };
