const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

export const currencyFormatter = (value: number) => {
  return formatter.format(value);
};

export const currencyDeformatter = (value: string) => {
  return Number(value.replace(/[^0-9]/g, ''));
};