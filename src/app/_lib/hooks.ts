import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTopRecords,
  getMyInfo,
  postLogout,
  getUserInfoAdmin,
  getReviewsAdmin,
  deleteReviewAdmin,
  getTopKnowledges,
  getKnowledge,
  getKnowledges,
  postKnowledgeReaction,
  postRecordReaction,
  getProfileInfo,
  getProfileRecord,
  getProfileRecordDetail,
  deleteRecord
} from "./api";

// 실시간 인기 공간 기록을 가져오는 훅
export const useTopRecords = (limit: number) => {
  return useQuery<TopRecordType[]>({
    queryKey: ['topRecords'],
    queryFn: () => getTopRecords(limit)
  });
};

// 실시간 인기 공간 지식을 가져오는 함수
export const useTopKnowledges = (limit: number) => {
  return useQuery<KnowledgeType[]>({
    queryKey: ['topKnowledges'],
    queryFn: () => getTopKnowledges(limit)
  });
};

// 공간 지식 목록들을 가져오는 훅
export const useKnowledges = () => {
  return useQuery<KnowledgeType[]>({
    queryKey: ['knowledges'],
    queryFn: () => getKnowledges()
  });
};

// 공간 지식 상세 데이터를 가져오는 훅
export const useKnowledge = (knowledgeId: string) => {
  return useQuery<KnowledgeType>({
    queryKey: ['knowledge'],
    queryFn: () => getKnowledge(knowledgeId)
  });
};

// 공간 기록 좋아요 요청 훅
export const useRecordReaction = (recordId: string, reactionType: 'like' | 'dislike') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postRecordReaction(recordId, reactionType),
    onSuccess: () =>  {
      queryClient.invalidateQueries({ queryKey: ['records'] })
    }
  });
}

// 공간 지식 좋아요 요청 훅
export const useKnowledgeReaction = (knowledgeId: string, reactionType: 'like' | 'dislike') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postKnowledgeReaction(knowledgeId, reactionType),
    onSuccess: () =>  {
      queryClient.invalidateQueries({ queryKey: ['knowledge'] })
    }
  });
}

// 마이페이지 내 정보 요청
export const useMyInfo = (email: string) => {
  return useQuery<MyInfoTypes>({
    queryKey: ['myInfo'],
    queryFn: () => getMyInfo(email)
  });
};

// 마이페이지 내 정보 요청
export const useProfileInfo = (email: string) => {
  return useQuery<ProfileInfoTypes>({
    queryKey: ['profileInfo'],
    queryFn: () => getProfileInfo(email)
  });
};

// 마이페이지 공간기록 요청 훅
export const useProfileRecord = () => {
  return useQuery<MyRecordTypes[]>({
    queryKey: ['profileRecord'],
    queryFn: () => getProfileRecord()
  });
};

// 마이페이지 공간기록 상세 요청 훅
export const useProfileRecordDetail = (recordId: string) => {
  return useQuery<MyRecordDetail>({
    queryKey: ['profileRecordDetail'],
    queryFn: () => getProfileRecordDetail(recordId)
  });
};

// 공간기록 제거 요청 훅
export const useDeleteRecord = (recordId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRecord(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileRecord'] });
    }
  })
}

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

interface TopRecordType {
  post_id: string;
  author_nickname: string;
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
  reviews: MyRecordTypes[]
};

interface ProfileInfoTypes {
  email: string;
  nickname: string;
  phone_number: string;
  name: string;
  create_at: Date;
};

interface MyRecordTypes {
  post_id: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};

interface MyRecordDetail {
  post_id: string;
  address: string;
  address_detail: string;
  content: string;
  create_at: Date;
};

interface UserInfoTypes {
  id: string;
  email: string;
  name: string;
  nickname: string;
  phone_number: string;
  create_at: Date;
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

interface KnowledgeType {
  knowledge_id: string;
  author_nickname: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}