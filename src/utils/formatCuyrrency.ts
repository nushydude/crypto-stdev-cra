export const formatCurrency = (number: number, currency: string) => {
  const Currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return Currency.format(number);
};
