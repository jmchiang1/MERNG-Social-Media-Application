const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token'); //currently hitting this error when trying to submit a post
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};


// const { AuthenticationError } = require('apollo-server');   //apollo specific authentication error 
// const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('../../config');

// module.exports = (context) => {
//   const authHeader = context.req.headers.authorization; //Cannot read properties of undefined "headers"
//   // console.log("AUTH-HEADER",authHeader);
//   if (authHeader) {
//     // Bearer + token value
//     const token = authHeader.split('Bearer ')[1];   //split: get only the token value
//     if (token) {
//       try {
//         const user = jwt.verify(token, SECRET_KEY); //if user exist, verify the token then return user data 
//         return user;
//       } catch (err) {
//         throw new AuthenticationError('Invalid/Expired token'); //token error
//       }
//     }
//     throw new Error("Authentication token must be 'Bearer [token]");    //no token detected 
//   }
//   throw new Error('Authorization header must be provided'); //no authHeader detected 
// };