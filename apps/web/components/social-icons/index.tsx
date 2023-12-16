import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mastodon,
} from './icons';

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
};

interface SocialIconProps {
  kind: keyof typeof components;
  href: string | undefined;
  size?: number;
}

export function SocialIcon({
  kind,
  href,
  size = 8,
}: SocialIconProps): React.ReactNode {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+(?<g3>[.-]?\w+)@\w+(?<g2>[.-]?\w+)(?<g1>.\w{2,3})+$/.test(
        href,
      ))
  )
    return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  );
}
