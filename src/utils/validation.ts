const required = 'Field is required';

const validationMap: Record<string, (value: string) => string> = {
  email: (value) => {
    if (!value) {
      return required;
    }
    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!regex.test(value)) {
      return 'Please enter a correct email';
    }

    return '';
  },
  password: (value) => {
    if (!value) {
      return required;
    }

    return '';
  },
  name: (value) => {
    if (!value) {
      return required;
    }

    return '';
  }
}

export function validate(values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    if (validationMap[key](value)) {
      errors[key] = validationMap[key](value);
    }
  }

  return errors;
}