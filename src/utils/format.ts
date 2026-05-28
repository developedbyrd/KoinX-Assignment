function formatCurrencyInternal(value: number, maximumFractionDigits: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);

  if (formatted.startsWith("-₹")) {
    return formatted.replace("-₹", "- ₹ ");
  }

  return formatted.replace("₹", "₹ ");
}

export function formatCurrency(value: number, maximumFractionDigits = 2) {
  return formatCurrencyInternal(value, maximumFractionDigits);
}

export function formatCurrencyAdaptive(
  value: number,
  maximumFractionDigits = 2,
  smallValueFractionDigits = 6,
) {
  const fractionDigits =
    Math.abs(value) < 1 ? smallValueFractionDigits : maximumFractionDigits;
  return formatCurrencyInternal(value, fractionDigits);
}

export function formatSignedCurrency(value: number, maximumFractionDigits = 2) {
  const absoluteValue = formatCurrency(Math.abs(value), maximumFractionDigits);
  return value < 0 ? `- ${absoluteValue}` : absoluteValue;
}

export function formatSignedCurrencyAdaptive(
  value: number,
  maximumFractionDigits = 2,
  smallValueFractionDigits = 6,
) {
  const absoluteValue = formatCurrencyAdaptive(
    Math.abs(value),
    maximumFractionDigits,
    smallValueFractionDigits,
  );
  return value < 0 ? `- ${absoluteValue}` : absoluteValue;
}

export function formatHoldingAmount(value: number) {
  if (value === 0) {
    return "0";
  }

  if (Math.abs(value) < 0.00001) {
    return value.toExponential(4);
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 6,
  }).format(value);
}

export function formatCompactNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}
