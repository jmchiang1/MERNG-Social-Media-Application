const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

const generateToken = (user) => {
    return jwt.sign({   //sign token with id, email, and username
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY, {expiresIn: '24h'}  //generate token that expires in 24 hours
    )
}

module.exports = {
  Mutation: {
      //login existing user mutation with validation 
      async login(_, { username, password }){
          const { errors, valid } = validateLoginInput(username, password);
          if (!valid){
              throw new UserInputError('Errors', { errors });
          }
          const user = await User.findOne({ username });
          if(!user){
              errors.general = "User not found";
              throw new UserInputError('Wrong credentials', { errors });
          }
          const match = await bcrypt.compare(password, user.password); //compare hash and plain password
          if (!match){
                errors.general = "Wrong credentials";   //if error, throw error
                throw new UserInputError('Wrong credentials', { errors });
          }
          const token = generateToken(user);

          return {
              ...user._doc,
              id: user._id,
              token 
          }
      },
      //register new user mutation with validation 
    async register(
      _,    //parent param is blank
      { registerInput: { username, email, password, confirmPassword } } //register is "args" param, taken from type
    ) {
      //validate user data
      const { valid, errors } = validateRegisterInput( username, email, password, confirmPassword);
      if (!valid){
          throw new UserInputError('Errors', { errors });
      }
      //make sure username is unique
      const user = await User.findOne({ username });
      if ( user ) {
        throw new UserInputError("Usename already exist", { 
          errors: {
            username: "This username is taken",
          },
        });
      }
      //salt and hash password 
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

    //   password = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password,
      });
      const res = await newUser.save();

      const token = generateToken(res);    //execute generate token function here 

    //   const token = jwt.sign(
    //     {
    //       id: res.id,
    //       email: res.email,
    //       username: res.username,
    //     },
    //     SECRET_KEY,
    //     { expiresIn: "24h" }
    //   );

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
  },
};
