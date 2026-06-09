export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1 $2")
    .replace(/(\d{3})(\d)/, "$1 $2")
    .slice(0, 11);
}

export function maskBI(value: string) {
  // formato fictício: 000000000LA000
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 14);
}

export function maskNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function maskCurrency(value: string) {
  const num = value.replace(/\D/g, "");
  return new Intl.NumberFormat("pt-AO").format(Number(num));
}
