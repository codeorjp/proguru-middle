export const removeLeadingZeros = (text) =>
  text.length !== 1 ? text.replace(/^0+/g, "") : text;
