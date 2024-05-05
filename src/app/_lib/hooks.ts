import { useMutation, useQuery } from "@tanstack/react-query"

import { getUserInfo, postLogout } from "./api"

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
}

interface UserInfoTypes {
  _id: string;
  email: string;
  name: string;
  create_at: string;
}