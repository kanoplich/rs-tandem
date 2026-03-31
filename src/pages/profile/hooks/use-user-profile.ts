import { useAuth } from '@/entities/session';

export const useUserProfile = () => {
  const { user } = useAuth();

  const email = user?.email ?? '';
  const fullName = user?.user_metadata?.name ?? '';
  const avatar = user?.user_metadata?.avatar_url;

  const initials = fullName?.[0]?.toUpperCase();

  return {
    email,
    fullName,
    avatar,
    initials,
  };
};
