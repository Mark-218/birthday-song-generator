export const isValidEmail = (email: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
export const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
export const isValidName = (name: string) => /^[A-Za-z][A-Za-z\s'.-]{1,49}$/.test(name);
