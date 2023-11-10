export function timeSince(date:Date) {

  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " anos atrás";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " meses atrás";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " dias atrás";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " horas atrás";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutos atrás";
  }
  return Math.floor(seconds) + " segundos atrás";
}