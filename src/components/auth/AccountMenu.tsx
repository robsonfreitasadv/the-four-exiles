import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import { useAccount } from './useAccount';

/** Header pill: "Sign in" for visitors, the nickname for signed-in people; both open the account page. */
export function AccountMenu({ className = '' }: { className?: string }) {
  const { t } = useI18n();
  const account = useAccount();
  if (!account.enabled || account.loading) return null;
  const label = account.profile?.display_name ?? (account.session ? t.accountPage.kicker : t.account.signIn);
  return (
    <Link
      to="/account"
      className={`max-w-[9rem] truncate rounded-full border border-graphite-500 px-3 py-1.5 text-xs text-bone/80 transition-colors hover:border-bone hover:text-bone ${className}`}
    >
      {label}
    </Link>
  );
}
