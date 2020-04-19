export const AuthErrors = {
  emailExist: {
    errorName: 'auth/email-already-in-use',
    message: 'This email already exists!'
  },
  emailNotFound: {
    errorName: 'auth/user-not-found',
    message: 'There is no user with this email!'
  },
  invalidPassword: {
    errorName: 'auth/wrong-password',
    message: 'Invalid password!'
  },
  userDisabled: {
    errorName: 'auth/user-disabled',
    message: 'The user account was disabled by administrator!'
  }
};
