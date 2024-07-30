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
export function parseDate(date: Date) {
  // 날짜 월, 일 2자리로 고정
  const dateSplit = new Date(date).toLocaleString().split('. ');
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

// 길이 20의 랜덤 문자열 생성 함수
export function generateRandomString(length = 20) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charsLength = chars.length;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  
  return result;
}

// html 텍스트 추출 함수
export const stripHtml = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

// 본문 미리보기 반환 함수
export const getPreviewText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// 핸드폰 번호 파싱 함수
export function parsePhoneNumber(phoneNumber: string) {
  const splitPhoneNumber = phoneNumber.split(' ');
  return `0${splitPhoneNumber[splitPhoneNumber.length - 1]}`;
}

interface Coordinates {
  lat: number;
  lng: number;
}