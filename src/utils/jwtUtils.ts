import jwt from 'jsonwebtoken';

const secret = 'wefbi23iui39898fg9432uifg';

// access token 발급
export const sign = (userId: string) => {
  return jwt.sign({ id: userId }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  });
};

// access token 검증
export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret) as { id: string };
    return {
      ok: true,
      userId: decoded.id
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message
    }
  }
}

// refresh token 발급
export const refresh = (userId: string) => {
  return jwt.sign({ id: userId }, secret, {
    algorithm: 'HS256',
    expiresIn: '14d'
  })
}

export const refreshVerify = (token: string) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
}