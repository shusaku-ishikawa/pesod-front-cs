
import { ref } from 'vue';

export default function useFormField () {
  const error = ref<string>('');
  const validate = (value: any, validators: Array<Function>) => {
    let errorMessage = '';
    validators.map((v: Function) => {
      const result = v(value);
      if (result) {
        errorMessage = result;
      }
    });
    // error.value = errorMessage;
    return errorMessage;
  }
  return {
    error,
    validate
  }
}