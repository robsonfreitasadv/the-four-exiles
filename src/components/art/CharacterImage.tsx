import { useState, type ReactNode } from 'react';
import type { ArtImage } from '../../data/types';
import { useI18n } from '../../i18n/I18nProvider';

/** Root-relative asset paths follow the build's base, so relative (static) builds still find them. */
export const withBase = (src: string) => (src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src);

interface CharacterImageProps {
  image?: ArtImage;
  /** Shown instead when the image is missing or fails to load, so a broken URL never breaks layout. */
  fallback?: ReactNode;
  className?: string;
  /** Load immediately (above the fold) instead of lazily. */
  eager?: boolean;
  /** Hide from assistive tech when a caption already names the character. */
  decorative?: boolean;
  background?: string;
}

/** Character artwork filling its container (object-cover). */
export function CharacterImage({ image, fallback = null, className = '', eager, decorative, background }: CharacterImageProps) {
  const { l } = useI18n();
  const [failed, setFailed] = useState(false);
  if (!image || failed) return <>{fallback}</>;
  return (
    <img
      src={withBase(image.src)}
      alt={decorative ? '' : l(image.alt)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full select-none object-cover ${className}`}
      style={{ objectPosition: image.focus ?? '50% 20%', background }}
    />
  );
}
