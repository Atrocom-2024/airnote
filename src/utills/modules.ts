import cryptoJS from 'crypto-js';

export function encrypt(code: string, key: string) {
  const encrypted = cryptoJS.AES.encrypt(code, key);
  return encrypted.toString();
}

export function decrypt(code: string, key: string) {
  const decrypted = cryptoJS.AES.decrypt(code, key);
  return decrypted.toString(cryptoJS.enc.Utf8);
}

export function parseDate(date: string) {
  // 날짜 월, 일 2자리로 고정
  const dateSplit = date.split('. ');
  dateSplit[2] = dateSplit[2].padStart(2, '0');
  dateSplit[1] = dateSplit[1].padStart(2, '0');
  return dateSplit.join('. ').substring(0, 13);
}