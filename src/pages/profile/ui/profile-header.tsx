import { useProfileData } from '../hooks';
import { PROFILE_TEXT } from '../locales';

import { StageBadge, STAGES } from '@/shared';
import { useAuth } from '@/shared/hooks';

type ProfileHeaderProps = {
  stageBadges?: string[];
};

export const ProfileHeader = ({ stageBadges = [] }: ProfileHeaderProps) => {
  const { user } = useAuth();
  const { progress } = useProfileData();

  const email = user?.email ?? '';

  const fullName = user?.user_metadata?.name || email.split('@')[0] || 'User';

  const avatar = user?.user_metadata?.avatar;

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n.charAt(0).toUpperCase())
    .join('');

  const computedBadges =
    stageBadges.length > 0
      ? stageBadges
      : Array.from(new Set(progress.map((t) => t.stage)))
          .filter((stage) => progress.some((t) => t.stage === stage && t.completed > 0))
          .map((stageId) => {
            const stage = STAGES.find((s) => s.id === stageId);
            return stage?.title ?? `Stage ${stageId}`;
          });

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
              {computedBadges.length > 0 ? (
                computedBadges.map((badge, index) => (
                  <StageBadge
                    key={badge}
                    text={badge}
                    variant={index % 2 === 0 ? 'default' : 'completed'}
                  />
                ))
              ) : (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {PROFILE_TEXT.NO_STAGES}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
