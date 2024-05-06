import { useMutation, useQuery } from "@tanstack/react-query"

import { getAdminReviews, getUserInfo, postLogout } from "./api"

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

export const useUserSearch = (userName: string) => {
  return useQuery<UserInfoTypes>({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(userName)
  });
};

export const useReviewSearch = (address: string) => {
  return useQuery<ReviewType[]>({
    queryKey: ['reviews'],
    queryFn: () => getAdminReviews(address)
  });
};

interface UserInfoTypes {
  _id: string;
  email: string;
  name: string;
  create_at: string;
}

interface ReviewType {
  _id: string;
  author_email: string;
  author_name: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
  auth_file: string;
}