import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <div className="container-x py-24 md:py-32">
      <p className="kicker mb-4 text-signal">ERR-404 · {t.common.classified}</p>
      <h1 className="display max-w-4xl text-6xl sm:text-7xl">{t.common.notFoundTitle}</h1>
      <p className="mt-6 max-w-xl text-lg text-bone-dim">{t.common.notFoundBody}</p>
      <Link to="/" className="btn-primary mt-10">
        {t.common.backHome}
      </Link>
    </div>
  );
}
