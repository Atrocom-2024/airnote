namespace NodeJS {
  interface ProcessEnv {
    KAKAO_JS_KEY: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    NEXT_AUTH_SECRET: string;
    NEXTAUTH_URL: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_AES_EMAIL_SECRET_KEY: string;
    NEXT_PUBLIC_AES_ID_SECRET_KEY: string;
    NEXT_PUBLIC_AES_PW_SECRET_KEY: string;
    JWT_SECRET: string;
    DB_USER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    DB_SCHEMA: string;
    NAVER_STORAGE_ENDPOINT: string;
    NAVER_ACCESS_KEY: string;
    NAVER_SECRET_KEY: string;
    NAVER_BUCKET_NAME: string;
  }
}