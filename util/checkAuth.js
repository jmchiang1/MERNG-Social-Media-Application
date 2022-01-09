// const jwt = require('jsonwebtoken');
// const SECRET_KEY = require('../config')
// const { AuthenicationError } = require('apollo-server') //apollo specific authentication error 

// //context with have an object containing the authorization header 
// module.exports = (context) => {
//     const authHeader = context.req.headers.authorization;
//     if (authHeader){
//         //Bearer ...
//         const token = authHeader.split('Bearer ')[1];   //split token from bear word 
//         if (token){
//             try {
//                 const user = jwt.verify(token, SECRET_KEY); //if token exist, verify it 
//                 return user;
//             } catch (err){
//                 throw new AuthenicationError('Invalid/Expired Token')
//             }
//         }
//         throw new Error ('Authenication Token Error')   //no token detected 
//     }
//     throw new Error ('Authenication Header Error')   //no authHeader detected 
// }

const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization; //Cannot read properties of undefined "headers"
  console.log("AUTH-HEADER",authHeader);
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};

