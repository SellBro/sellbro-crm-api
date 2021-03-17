type Value = any;
type ErrorMessage = false | string;
type FieldValues = { [key: string]: Value };

const is = {
  match: (testFn: Function, message = '') => (
    value: Value,
    fieldValues: FieldValues,
  ): ErrorMessage => !testFn(value, fieldValues) && message,

  required: () => (value: Value): ErrorMessage =>
    isNilOrEmptyString(value) && 'This field is required',

  minLength: (min: number) => (value: Value): ErrorMessage =>
    !!value && value.length < min && `Must be at least ${min} characters`,

  maxLength: (max: number) => (value: Value): ErrorMessage =>
    !!value && value.length > max && `Must be at most ${max} characters`,

  oneOf: (arr: any[]) => (value: Value): ErrorMessage =>
    !!value && !arr.includes(value) && `Must be one of: ${arr.join(', ')}`,

  email: () => (value: Value): ErrorMessage =>
    !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',
};

const isNilOrEmptyString = (value: Value): boolean =>
  value === undefined || value === null || value === '';

export default is;
