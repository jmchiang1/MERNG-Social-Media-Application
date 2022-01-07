const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput } = require('../../util/validators')

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //todo: validate user data
      const { valid, errors } = validateRegisterInput( username, email, password, confirmPassword);
      if (!valid){
          throw new UserInputError('Errors', { errors });
      }
      //todo make sure username is unique
      const user = await User.findOne({ username });
      if ( user ) {
        throw new UserInputError("Usename already exist", { 
          errors: {
            username: "This username is taken",
          },
        });
      }
      //hash password and create auth token
      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password,
      });
      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "24h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
