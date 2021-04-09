
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

export {
  required as formRequired,
  getRegexpTester
}