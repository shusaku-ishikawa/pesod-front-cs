const required = (v: any) => {
  if (typeof v === 'string') {
    return v ? null : '必須項目です。'
  }
};
const getRegexpTester = (pattern: string, errorMessage: string) => {
  const r = new RegExp(pattern);
  return (v: any) => {
    return r.test(v) ? null : errorMessage;
  }
}

export {
  required as formRequired,
  getRegexpTester
}