import { useQuery, useMutation } from "@tanstack/react-query";

import {
  getTopReviews,
  getMyInfo,
  postLogout,
  getUserInfoAdmin,
  getReviewsAdmin,
  deleteReviewAdmin
} from "./api";

// 상위 4개 공간 기록 데이터를 가져오는 훅
export const useTopReviews = () => {
  return useQuery<TopReviewType[]>({
    queryKey: ['topReviews'],
    queryFn: () => getTopReviews()
  });
};

// 마이페이지 내 정보 요청
export const useMyInfo = (email: string) => {
  return useQuery<MyInfoTypes>({
    queryKey: ['myInfo'],
    queryFn: () => getMyInfo(email)
  });
};

// 관리자 로그아웃 요청 훅
export const useAdminLogout = () => {
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => window.location.reload(),
    onError: (err) => {
      console.error(err);
      return alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  });
};

// 사용자 정보 요청(관리자) 훅
export const useUserSearch = (userName: string) => {
  return useQuery<UserInfoTypes>({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfoAdmin(userName)
  });
};

// 공간 기록 목록 요청(관리자) 훅
export const useReviewSearch = (address: string) => {
  return useQuery<ReviewType[]>({
    queryKey: ['reviewSearch'],
    queryFn: () => getReviewsAdmin(address)
  });
};

// 공간 기록 제거 요청(관리자) 훅
export const useDeleteReview = () => {
  return useMutation({
    mutationFn: deleteReviewAdmin,
    onSuccess: () => window.location.reload(),
    onError: (err) => {
      console.error(err);
      return alert('기록 제거에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  });
};

interface TopReviewType {
  post_id: string;
  address: string;
  address_detail: string;
  latitude: string;
  longitude: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};

interface MyInfoTypes {
  user_info: {
    email: string;
    nickname: string;
  },
  reviews: MyReviewTypes[]
};

interface MyReviewTypes {
  post_id: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};

interface UserInfoTypes {
  _id: string;
  email: string;
  name: string;
  nickname: string;
  phone_number: string;
  create_at: string;
};

interface ReviewType {
  post_id: string;
  author_email: string;
  author_name: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  content: string;
  auth_file_url: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};