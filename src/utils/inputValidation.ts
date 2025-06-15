
export const InputValidation = {
  // Email validation
  email: (email: string): { isValid: boolean; error?: string } => {
    const sanitized = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!sanitized) {
      return { isValid: false, error: 'Email is required' };
    }
    
    if (sanitized.length > 254) {
      return { isValid: false, error: 'Email is too long' };
    }
    
    if (!emailRegex.test(sanitized)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    return { isValid: true };
  },

  // Password validation
  password: (password: string): { isValid: boolean; error?: string } => {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    
    if (password.length < 12) {
      return { isValid: false, error: 'Password must be at least 12 characters long' };
    }
    
    if (password.length > 128) {
      return { isValid: false, error: 'Password is too long' };
    }
    
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    
    if (!/[0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one special character' };
    }
    
    return { isValid: true };
  },

  // Text input validation
  text: (text: string, minLength = 1, maxLength = 1000): { isValid: boolean; error?: string } => {
    const sanitized = text.trim();
    
    if (sanitized.length < minLength) {
      return { isValid: false, error: `Text must be at least ${minLength} characters long` };
    }
    
    if (sanitized.length > maxLength) {
      return { isValid: false, error: `Text must be no more than ${maxLength} characters long` };
    }
    
    return { isValid: true };
  },

  // Sanitize HTML content
  sanitizeHtml: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Sanitize general input
  sanitize: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  },

  // URL validation
  url: (url: string): { isValid: boolean; error?: string } => {
    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { isValid: false, error: 'Please enter a valid URL' };
    }
  },

  // Number validation
  number: (value: string, min?: number, max?: number): { isValid: boolean; error?: string } => {
    const num = parseFloat(value);
    
    if (isNaN(num)) {
      return { isValid: false, error: 'Please enter a valid number' };
    }
    
    if (min !== undefined && num < min) {
      return { isValid: false, error: `Number must be at least ${min}` };
    }
    
    if (max !== undefined && num > max) {
      return { isValid: false, error: `Number must be no more than ${max}` };
    }
    
    return { isValid: true };
  }
};
