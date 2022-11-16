export function Round(number, decimal) {
  const powTen = Math.pow(10, decimal);
  return Math.round(number * powTen) / powTen;
}
