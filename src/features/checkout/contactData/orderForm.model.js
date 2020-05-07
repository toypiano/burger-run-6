export const initialOrderForm = {
  name: {
    inputType: 'input',
    config: {
      label: 'Name',
      type: 'text',
      placeholder: 'John Doe',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    touched: false,
    valid: false,
  },
  street: {
    inputType: 'input',
    config: {
      label: 'Street',
      type: 'text',
      placeholder: '17 Burger Ave. East',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    touched: false,
    valid: false,
  },
  zipCode: {
    inputType: 'input',
    config: {
      label: 'Zip Code',
      type: 'text',
      placeholder: '5-digit zip code(ex. 12345)',
    },
    value: '',
    validation: {
      isRequired: true,
      isNumeric: true,
      minLength: 5,
      maxLength: 5,
    },
    touched: false,
    valid: false,
  },
  country: {
    inputType: 'input',
    config: {
      label: 'Country',
      type: 'text',
      placeholder: 'Canada',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    touched: false,
    valid: false,
  },
  email: {
    inputType: 'input',
    config: {
      label: 'Email',
      type: 'email',
      placeholder: 'john@doe.com',
    },
    value: '',
    validation: {
      isRequired: true,
      isEmail: true,
    },
    touched: false,
    valid: false,
  },
  deliveryMethod: {
    inputType: 'select',
    config: {
      label: 'Delivery Method',
      options: [
        { value: '', text: 'Please select one' },
        { value: 'fastest', text: 'Fastest' },
        { value: 'cheapest', text: 'Cheapest' },
      ],
    },
    value: '',
    validation: {
      isRequired: true,
    },
    touched: false,
    valid: false,
  },
};
