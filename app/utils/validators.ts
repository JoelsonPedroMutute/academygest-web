export function isEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isStrongPassword(password: string): boolean {
  // mínimo 8, 1 letra, 1 número
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
}

export function isRequired(value: unknown): boolean {
  return value !== null && value !== undefined && value !== "";
}

export function isNumber(value: unknown): boolean {
  return !isNaN(Number(value));
}
