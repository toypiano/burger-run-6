export default {
  email: {
    inputType: 'input',
    config: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
    },
    value: '',
    validation: {
      isRequired: true,
      isEmail: true,
    },
    touched: false,
    valid: false,
  },
  password: {
    inputType: 'input',
    config: {
      label: 'Password',
      type: 'text',
      placeholder: 'Minimum 6 characters',
    },
    value: '',
    validation: {
      isRequired: true,
      minLength: 6,
    },
    touched: false,
    valid: false,
  },
};
