function parseNumber(value) {
    if (typeof value !== 'undefined' && value !== null && value !== '') {
      return value === -1 || value === '-1' ? 'N/A' : value;
    }
    return '--';
}

console.log(parseNumber('-1'));