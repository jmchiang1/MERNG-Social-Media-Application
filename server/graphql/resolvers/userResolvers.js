const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = require('../../../config')
const { UserInputError } = require("apollo-server");    //apollo-server specific error component 
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')  //import login and register validators 

const generateToken = (user) => {
    return jwt.sign({   //sign token with id, email, and username
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY, {expiresIn: '1000h'}  //generate token that expires in 24 hours
    )
}

module.exports = {
  Mutation: {

      //login existing user mutation with validation 
      async login(_, { username, password }){
          const { errors, valid } = validateLoginInput(username, password); //destructure error and valid 
          if (!valid){
              throw new UserInputError('Errors', { errors });
          }
          const user = await User.findOne({ username });
          if(!user){
              errors.general = "User not found";
              throw new UserInputError('User not found', { errors });
          }
          //if no error occurs, then we can move on to match the passwords 
          const match = await bcrypt.compare(password, user.password);
          if (!match){
                errors.general = "Wrong Password";   //if error, throw error
                throw new UserInputError('Wrong Password', { errors });
          }
          //by this point, user has successfully logged in, so issue token 
          const token = generateToken(user);

          return {              //return user data, id, and associated token 
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
          throw new UserInputError('Errors', { errors });   //if not valid, throw error
      }
      //make sure username is unique
      const user = await User.findOne({ username });    //find user by username
      if ( user ) {
        throw new UserInputError("Usename already exist", { //if user already exist in DB, throw error message
          errors: { //error payload 
            username: "This username is taken",
          },
        });
      }
      //if username is uniqe, then move on to salt and hash the new password 
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

    //   password = await bcrypt.hash(password, 10);

      const newUser = new User({    //create new user model 
        email,
        username,
        password,   //store new secure password
      });
      const res = await newUser.save(); //save password in DB

      const token = generateToken(res);    //generate token for new user 

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
        ...res._doc,    //return user data with token 
        id: res._id,
        token
      };
    },
  },
};
