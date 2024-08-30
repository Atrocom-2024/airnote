import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import {
  getTopRecords,
  postLogout,
  getUserSearchAdmin,
  deleteReviewAdmin,
  getTopKnowledges,
  getKnowledge,
  getKnowledges,
  postKnowledgeReaction,
  postRecordReaction,
  getProfileInfo,
  getProfileRecord,
  getProfileRecordDetail,
  deleteRecord,
  getProfileKnowledges,
  getProfileKnowledgeDetail,
  deleteKnowledge,
  deleteUser,
  getRecordSearchAdmin,
  getKnowledgeSearchAdmin
} from "./api";

// 실시간 인기 공간기록을 가져오는 훅
export const useTopRecords = (limit: number) => {
  return useQuery<TopRecordType[]>({
    queryKey: ['topRecords'],
    queryFn: () => getTopRecords(limit)
  });
};

// 실시간 인기 공간지식을 가져오는 함수
export const useTopKnowledges = (limit: number) => {
  return useQuery<KnowledgeType[]>({
    queryKey: ['topKnowledges'],
    queryFn: () => getTopKnowledges(limit)
  });
};

// 공간지식 목록들을 가져오는 훅
export const useKnowledges = () => {
  return useQuery<KnowledgeType[]>({
    queryKey: ['knowledges'],
    queryFn: () => getKnowledges()
  });
};

// 공간지식 상세 데이터를 가져오는 훅
export const useKnowledge = (knowledgeId: string) => {
  return useQuery<KnowledgeType>({
    queryKey: ['knowledge'],
    queryFn: () => getKnowledge(knowledgeId)
  });
};

// 공간기록 좋아요 요청 훅
export const useRecordReaction = (recordId: string, reactionType: 'like' | 'dislike') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postRecordReaction(recordId, reactionType),
    onSuccess: () =>  {
      queryClient.invalidateQueries({ queryKey: ['records'] })
    }
  });
}

// 공간지식 좋아요 요청 훅
export const useKnowledgeReaction = (knowledgeId: string, reactionType: 'like' | 'dislike') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postKnowledgeReaction(knowledgeId, reactionType),
    onSuccess: () =>  {
      queryClient.invalidateQueries({ queryKey: ['knowledge'] })
    }
  });
};

// 마이페이지 내 정보 요청
export const useProfileInfo = () => {
  return useQuery<ProfileInfoTypes>({
    queryKey: ['profileInfo'],
    queryFn: () => getProfileInfo()
  });
};

// 마이페이지 공간기록 목록 요청 훅
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
  });
};

// 마이페이지 공간지식 목록 요청 훅
export const useProfileKnowledges = () => {
  return useQuery<MyKnowledgeType[]>({
    queryKey: ['profileKnowledges'],
    queryFn: () => getProfileKnowledges()
  });
};

// 마이페이지 공간지식 상세 요청 훅
export const useProfileKnowledgeDetail = (knowledgeId: string) => {
  return useQuery<MyKnowledgeType>({
    queryKey: ['profileKnowledge'],
    queryFn: () => getProfileKnowledgeDetail(knowledgeId)
  });
};

// 공간기록 제거 요청 훅
export const useDeleteKnowledge = (knowledgeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteKnowledge(knowledgeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileKnowledges'] });
    }
  });
};

// 회원탈퇴 요청 훅
export const useUserDelete = (userId: string | undefined) => {
  return useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      alert('회원탈퇴가 완료되었습니다.\n지금까지 저희 서비스를 이용해주셔서 감사합니다.');
      signOut();
    },
    onError: (error) => {
      console.error('회원탈퇴 중 오류 발생:', error);
    },
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
  return useQuery<UserInfoTypes[]>({
    queryKey: ['userInfo', userName],
    queryFn: () => getUserSearchAdmin(userName),
    enabled: true
  });
};

// 공간기록 목록 검색 요청(관리자) 훅
export const useRecordSearchAdmin = (address: string) => {
  return useQuery<RecordType[]>({
    queryKey: ['recordAdmin', address],
    queryFn: () => getRecordSearchAdmin(address),
    enabled: true
  });
};

// 공간기록 제거 요청(관리자) 훅
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

// 공간지식 목록 검색 요청(관리자) 훅
export const useKnowledgeSearchAdmin = (title: string) => {
  return useQuery<AdminKnowledgeType[]>({
    queryKey: ['knowledgesAdmin', title],
    queryFn: () => getKnowledgeSearchAdmin(title),
    enabled: true
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

interface ProfileInfoTypes {
  id: string;
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

interface MyKnowledgeType {
  knowledge_id: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}

interface UserInfoTypes {
  id: string;
  email: string;
  name: string;
  nickname: string;
  phone_number: string;
  create_at: Date;
};

interface RecordType {
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

interface AdminKnowledgeType {
  knowledge_id: string;
  author_email: string;
  author_nickname: string;
  author_name: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}