import { useUserProfile } from '../hooks/use-user-profile';

import { Badge } from '@/shared';

type StageBadgeType = {
  title: string;
  completed: boolean;
};

type ProfileHeaderProps = {
  stageBadges: StageBadgeType[];
};

export const ProfileHeader = ({ stageBadges = [] }: ProfileHeaderProps) => {
  const { email, fullName, avatar, initials } = useUserProfile();

  return (
    <div className="px-4 pt-8 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center gap-4 sm:gap-6 rounded-2xl shadow-sm overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={fullName}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-17 h-17 sm:w-19 sm:h-19 text-lg sm:text-xl font-medium text-primary-foreground rounded-full bg-primary">
              {initials}
            </div>
          )}

          <div className="flex flex-col overflow-hidden">
            <span className="text-base sm:text-lg text-accent-foreground capitalize whitespace-nowrap overflow-hidden text-ellipsis">
              {fullName}
            </span>

            <span className="text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
              {email}
            </span>

            <div className="flex gap-2 mt-2 overflow-x-auto">
              {stageBadges.map((stage) => (
                <Badge key={stage.title} variant={stage.completed ? 'active' : 'default'}>
                  {stage.title}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
