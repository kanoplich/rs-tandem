import { useAuth } from '@/shared/hooks';

type ProfileHeaderProps = {
  stageBadges?: string[];
};

export const ProfileHeader = ({ stageBadges = [] }: ProfileHeaderProps) => {
  const { user } = useAuth();

  const email = user?.email ?? '';

  const name = email.split('@')[0]?.replace(/[._]/g, ' ') || 'User';

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-6 px-4 py-8 rounded-2xl shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 text-xl font-medium text-primary-foreground rounded-full bg-primary">
        {firstLetter}
      </div>

      <div className="flex flex-col">
        <span className="text-lg text-accent-foreground capitalize">{name}</span>
        <span className="text-sm text-muted-foreground">{email}</span>

        <div className="flex flex-wrap gap-2 mt-2">
          {stageBadges.length > 0 ? (
            stageBadges.map((badge) => (
              <span key={badge} className="px-2 py-1 text-xs rounded-md bg-secondary">
                {badge}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">No stages yet</span>
          )}
        </div>
      </div>
    </div>
  );
};
