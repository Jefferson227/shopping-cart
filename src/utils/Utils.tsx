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

function convertCurrencyToFloat(
  val?: string | number | null,
  decimalPlaces?: number
) {
  let divisor = 100;

  if (decimalPlaces) divisor = Math.pow(10, decimalPlaces);

  let value = val != null ? val.toString() : '0';

  return parseFloat(value.replaceAll(',', '').replaceAll('.', '')) / divisor;
}

function showAsLocaleCurrency(number: number) {
  const localeCurrency = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const strNumber = localeCurrency.format(number);
  const symbol = navigator.language === 'pt-BR' ? 'R$ ' : '$';

  return `${symbol}${strNumber}`;
}

function showAsLocaleDecimal(number: number) {
  const localeDecimal = new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
  });

  return localeDecimal.format(number);
}

const Utils = {
  applyCurrencyMask,
  applyCurrencyMaskWithSymbol,
  applyDecimalMask,
  convertCurrencyToFloat,
  showAsLocaleCurrency,
  showAsLocaleDecimal,
};

export default Utils;
