import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => 
{ const errors: Array<{ path: string; message: string }> = [];
  err.inner.forEach(e => {  errors.push({ path: e.path, message: e.message });  });
  return errors;
};
/*sample
ValidationError {
      name: 'ValidationError',
      value: { password: 'bb', email: 'bb@bb.com' },
      path: undefined,
      type: undefined,
      errors: [ 'password must be at least 3 characters' ],
      inner:
       [ ValidationError {
           name: 'ValidationError',
           value: 'bb',
           path: 'password',
           type: 'min',
           errors: [Object],
           inner: [],
           message: 'password must be at least 3 characters',
           params: [Object] } ],
      message: 'password must be at least 3 characters' }
      */