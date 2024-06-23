import cryptoJS from 'crypto-js';

// 암호화 함수
export function encrypt(code: string, key: string) {
  const encrypted = cryptoJS.AES.encrypt(code, key);
  return encrypted.toString();
}

// 복호화 함수
export function decrypt(code: string, key: string) {
  const decrypted = cryptoJS.AES.decrypt(code, key);
  return decrypted.toString(cryptoJS.enc.Utf8);
}

// 날짜 연, 월, 일 2자리로 고정하는 함수
export function parseDate(date: string) {
  // 날짜 월, 일 2자리로 고정
  const dateSplit = date.split('. ');
  dateSplit[2] = dateSplit[2].padStart(2, '0');
  dateSplit[1] = dateSplit[1].padStart(2, '0');
  return dateSplit.join('. ').substring(0, 13);
}

// 사용자의 위치를 받아오는 함수
export function getLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // Resolve the promise with the coordinates
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          // Reject the promise if there's an error
          console.error(error);
          resolve({
            lat: 37.575184758466044,
            lng: 126.97517453354219
          })
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

interface Coordinates {
  lat: number;
  lng: number;
}