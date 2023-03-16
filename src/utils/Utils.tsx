function applyCurrencyMask(value?: string | number | null) {
  if (!value) value = '0';

  if (typeof value === 'number') value = value.toString();

  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = {
    minimumFractionDigits: 2,
  };

  const result = new Intl.NumberFormat(navigator.language, options).format(
    parseFloat(value) / 100
  );

  return result;
}

function applyDecimalMask(
  decimalPlaces: number,
  value?: string | number | null
) {
  if (!value) value = '0';

  if (typeof value === 'number') value = value.toString();

  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = {
    minimumFractionDigits: decimalPlaces,
  };

  const result = new Intl.NumberFormat(navigator.language, options).format(
    parseFloat(value) / Math.pow(10, decimalPlaces)
  );

  return result;
}

function applyCurrencyMaskWithSymbol(value?: string | number | null) {
  if (!value) value = '0';

  if (typeof value === 'number') value = value.toString();

  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: navigator.language === 'pt-BR' ? 'BRL' : 'USD',
  };

  const result = new Intl.NumberFormat(navigator.language, options).format(
    parseFloat(value) / 100
  );

  return result;
}

function convertCurrencyToFloat(val: string) {
  return parseFloat(val.replaceAll(',', '').replaceAll('.', '')) / 100;
}

const Utils = {
  applyCurrencyMask,
  applyCurrencyMaskWithSymbol,
  applyDecimalMask,
  convertCurrencyToFloat,
};

export default Utils;
