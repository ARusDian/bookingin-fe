const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export const currencyFormatter = (value: number) => {
  return formatter.format(value);
};