import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';

const secret = 'wefbi23iui39898fg9432uifg';

// access token 발급
export const generateAccessToken = async (payload: JWTPayload) => {
  const iat = Math.floor(Date.now() / 1000);
  const accessExp = iat + 60 * 60;
  const accessToken =  await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(accessExp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
  return { accessToken };
};

// refresh token 발급
export const generateRefreshToken = async (payload: JWTPayload) => {
  const iat = Math.floor(Date.now() / 1000);
  const refreshExp = iat + 60 * 60 * 24 * 3;
  const refreshToken =  await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(refreshExp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
  return { refreshToken };
}

// token 검증
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return {
      valid: true,
      payload
    };
  } catch (err) {
    return {
      valid: false,
      message: err
    }
  }
}
