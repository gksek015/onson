'use client';

import { supabase } from '@/utils/supabase/client';
import { useCallback, useEffect, useState } from 'react';

type UnreadMessagesMap = { [chatRoomId: string]: boolean };

export const useUnreadMessage = (userId: string) => {
  const [unreadMessages, setUnreadMessages] = useState<UnreadMessagesMap>({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  // fetchUnreadMessages를 useCallback으로 감싸고 userId를 의존성으로 포함
  const fetchUnreadMessages = useCallback(async () => {
    if (!userId) return; // userId가 없을 경우 실행하지 않음
    try {
      setIsPending(true);
      const { data, error } = await supabase
        .from('messages')
        .select('chat_id, read, user_id')
        .eq('read', false) // 읽지 않은 메시지만
        .neq('user_id', userId); // 본인이 보낸 메시지는 제외

      if (error) {
        throw error;
      }

      const unreadMap: UnreadMessagesMap = {};
      data?.forEach((message) => {
        unreadMap[message.chat_id] = true;
      });

      setUnreadMessages(unreadMap);
    } catch (error) {
      setIsError(true);
      console.error('Failed to fetch unread messages:', error);
    } finally {
      setIsPending(false);
    }
  }, [userId]); // userId를 의존성으로 추가

  // useEffect에 fetchUnreadMessages를 의존성으로 추가
  useEffect(() => {
    fetchUnreadMessages(); // 초기 데이터 가져오기

    const interval = setInterval(() => {
      fetchUnreadMessages(); // 10초마다 갱신
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchUnreadMessages]); // fetchUnreadMessages를 의존성 배열에 추가

  return { unreadMessages, isPending, isError, refetch: fetchUnreadMessages };
};
