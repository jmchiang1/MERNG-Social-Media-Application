//register user validation
module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassowrd
) => {
  const errors = {};    //errors = empty object, populate this later 
  if (!username) {
    errors.username = "username must not be empty";
  }
  if (!email) {
    errors.email = "email must not be empty";
  } else {
    const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;    //standard regex email validator 
    if (!email.match(regex)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (!password) {
    errors.password = "Password must not be empty ";
  } else if (password !== confirmPassowrd) {
    errors.confirmPassowrd = "Passwords must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,  //if error length is less than 1, then entire data is valid
  };
};

//login user validation
module.exports.validateLoginInput = (username, password) => {   //no need for email since we login in with username
  const errors = {};
  if (!username) {
    errors.username = "username must not be empty";
  }
  // if (!email){
  //     errors.email = "email must not be empty";
  // } else {
  //     const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
  //     if (!email.match(regex)){
  //         errors.email = "Email must be a valid email address"
  //     }
  // }
  if (!password) {
    errors.password = "Password must not be empty ";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
