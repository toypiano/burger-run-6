/**
 * Validate input value
 * @param {string} value - input value to validate
 * @param {Object} rules - Object containing validation rules
 * @returns {boolean}
 */
export function validateInput(value, rules) {
  if (!rules) {
    console.error('No validation rule passed');
    return false;
  }
  if (rules.isRequired && value.trim().length === 0) {
    return false;
  }
  if (rules.isNumeric && !/^\d+$/.test(value)) {
    return false;
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (rules.isEmail && !re.test(value)) {
    return false;
  }
  if (rules.minLength && value.length < rules.minLength) {
    return false;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return false;
  }

  console.error('Rules passed but not handled');
  return true;
}
