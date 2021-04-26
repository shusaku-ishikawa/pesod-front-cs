import { Ref } from "@vue/reactivity";

const required = (v: any) => {
  if (typeof v === 'string') {
    return v ? null : '必須項目です。'
  }
};
const getRegexpTester = (pattern: RegExp, errorMessage: string) => {
  return (v: any) => {
    return pattern.test(v) ? null : errorMessage;
  }
}

const emailValidator = (v: string) => {
  return getRegexpTester(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'メールアドレスの形式が不正です。')(v)
}

const validate = (data: { [key: string]: any }, validators: { [key: string]: Function[] }, errors: Ref<{ [key: string]: string }>) => {
  let hasError = false;
  Object.entries(validators).map(([key, validators]) => {
    let fieldError = '';
    errors.value[key] = '';
    validators.map((v: Function) => {
      if (fieldError) return;

      const e = v(data[key]);
      if (e) {
        fieldError = e;
        hasError = true;
      }
    });
    
    if (fieldError) errors.value[key] = fieldError;
  });
  return !hasError;
}

export {
  required as formRequired,
  emailValidator,
  getRegexpTester,
  validate
}