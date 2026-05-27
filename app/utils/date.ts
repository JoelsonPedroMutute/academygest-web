export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("pt-AO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat("pt-AO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getAge(dateOfBirth: string | Date) {
  const birth = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function isPast(date: string | Date) {
  return new Date(date).getTime() < Date.now();
}
