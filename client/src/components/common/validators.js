const usernameValidator = username => {
    if (username.trim() === '') {
       return 'Username is required';
    }
    // if (/[^a-zA-Z -]/.test(fieldValue)) {
    //     return 'Invalid characters';
    //}
        return null;
};
  
const emailValidator = email => {
    if (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email,
      )
    ) {
      return null;
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return 'Please enter a valid email';
  };
  
const passwordValidator = password => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  };

// Returns an object with errors and touched
// takes form values and validation object which has keys corresponding
// to the form value keys
// example 'values':
//  {
//   username: name
//   email: email@domain.com,
//   password: password,
// }
// example 'validate':
// {
//   username: usernameValidator,
//   email: emailValidator,
//   password: passwordValidator,
// }
function getFormValidationState(values, validate, errors, touched){
  return Object.keys(values).reduce(
    (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
            errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
            },
            touched: {
            ...acc.touched,
            ...newTouched,
            },
        };
    },
    { errors: { ...errors }, touched: { ...touched }},
  );
};

function formStateIsValid(formValidationState, values){
  return (
    !Object.values(formValidationState.errors).length && // errors object is empty
    Object.values(formValidationState.touched).length ===
    Object.values(values).length && // all fields were touched
    Object.values(formValidationState.touched).every(t => t === true) // every touched field is true
  )
}

export {
  usernameValidator, 
  emailValidator, 
  passwordValidator ,
  getFormValidationState,
  formStateIsValid
}