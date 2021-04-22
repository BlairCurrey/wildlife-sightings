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
  if (email.trim() === '') {
    return 'Email is required';
  }
  if (
    !(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      email,
    ))
  ) {
    return 'Please enter a valid email';
  }
  return null;
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

const animalIdValidator = animalId => {
  if (!animalId) {
    return 'Animal is required';
  }

  return null;
};

const latitudeValidator = latitude => {
  if (latitude.trim() === '') {
    return 'Latitude is required';
  }

  if (isNaN(latitude)) {
    return 'Latitude must be a number';
  }

  const min = -90;
  const max = 90;
  if (min > latitude || latitude > max ) {
    return `Invalid latitude - must be between ${min} and ${max}`;
  }

  return null;
};

const longitudeValidator = longitude => {
  if (longitude.trim() === '') {
    return 'Latitude is required';
  }

  if (isNaN(longitude)) {
    return 'Longitude must be a number';
  }

  const min = -180;
  const max = 180;
  if (min > longitude || longitude > max ) {
    return `Invalid latitude - must be between ${min} and ${max}`;
  }

  return null;
};


const dateValidator = date => {
  if (!date) {
    return 'Date is required';
  }

  let todaysDate = new Date().toISOString().split("T")[0];
  if (date > todaysDate) {
    return 'Date can\'t be in the future'
  }

  return null;
};

const commentValidator = comment => {
  if (comment.length > 500) {
    return 'Cannot exceed 500 characters';
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
  getFormValidationState,
  formStateIsValid,
  usernameValidator, 
  emailValidator, 
  passwordValidator ,
  animalIdValidator,
  latitudeValidator,
  longitudeValidator,
  dateValidator,
  commentValidator
}