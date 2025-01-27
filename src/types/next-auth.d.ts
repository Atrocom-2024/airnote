import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      nickname: string;
      name: string;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth' {
  interface Profile {
    kakao_account: {
      profile_nickname_needs_agreement: boolean;
      profile: { nickname: string; is_default_nickname: boolean; },
      name_needs_agreement: boolean;
      name: string;
      has_email: boolean;
      email_needs_agreement: boolean;
      is_email_valid: boolean;
      is_email_verified: boolean;
      email: string;
      has_phone_number: boolean;
      phone_number_needs_agreement: boolean;
      phone_number: string;
    }
  }
}