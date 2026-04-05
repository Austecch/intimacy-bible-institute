export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateMinLength(value: string, minLength: number, fieldName: string): string | null {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): string | null {
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`;
  }
  return null;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

export interface ValidationRule {
  validate: (value: string) => string | null;
}

export function validateForm(
  data: Record<string, string>,
  rules: Record<string, ValidationRule[]>
): Record<string, string> {
  const errors: Record<string, string> = {};
  
  for (const field in rules) {
    const value = data[field] || "";
    for (const rule of rules[field]) {
      const error = rule.validate(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  
  return errors;
}

export function createRequiredRule(fieldName: string): ValidationRule {
  return {
    validate: (value: string) => validateRequired(value, fieldName),
  };
}

export function createEmailRule(): ValidationRule {
  return {
    validate: (value: string) => {
      if (!value) return null;
      return validateEmail(value) ? null : "Invalid email address";
    },
  };
}

export function createMinLengthRule(minLength: number, fieldName: string): ValidationRule {
  return {
    validate: (value: string) => validateMinLength(value, minLength, fieldName),
  };
}

export function createMaxLengthRule(maxLength: number, fieldName: string): ValidationRule {
  return {
    validate: (value: string) => validateMaxLength(value, maxLength, fieldName),
  };
}

export function createPasswordRule(): ValidationRule {
  return {
    validate: (value: string) => {
      if (!value) return null;
      const result = validatePassword(value);
      return result.isValid ? null : result.errors[0];
    },
  };
}

export function createPhoneRule(): ValidationRule {
  return {
    validate: (value: string) => {
      if (!value) return null;
      return validatePhone(value) ? null : "Invalid phone number";
    },
  };
}
