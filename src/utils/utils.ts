function capitalizeWords(str: string): string {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}

/**
 * Combine CustomerAddress object into a string
 */
function formatAddress(address: CustomerAddress): string {
  return `${address.street}, ${address.regency}, ${address.district}, ${address.city}`;
}

export { capitalizeWords, formatAddress };
