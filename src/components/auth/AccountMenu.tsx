import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import { useAccount } from './useAccount';

/**
 * Header pill: "Sign in" for visitors; for signed-in people, the nickname (opens the account page) and a
 * "Sign out" button right next to it.
 */
export function AccountMenu({ className = '' }: { className?: string }) {
  const { t } = useI18n();
  const account = useAccount();
  if (!account.enabled || account.loading) return null;
  const pill =
    'max-w-[9rem] truncate rounded-full border border-graphite-500 px-3 py-1.5 text-xs text-bone/80 transition-colors hover:border-bone hover:text-bone';

  if (!account.session) {
    return (
      <Link to="/account" className={`${pill} ${className}`}>
        {t.account.signIn}
      </Link>
    );
  }

  return (
    <span className={`items-center gap-1.5 ${className}`}>
      <Link to="/account" className={`${pill} inline-block`}>
        {account.profile?.display_name ?? t.accountPage.kicker}
      </Link>
      <button type="button" onClick={() => void account.signOut()} className={`${pill} inline-block`}>
        {t.account.signOut}
      </button>
    </span>
  );
}
