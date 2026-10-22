import {
  LOCKUP_MONOGRAM_TRANSFORM,
  LOCKUP_VIEWBOX,
  LOCKUP_WORDMARK_TRANSFORM,
  MONOGRAM_PATH,
  MONOGRAM_VIEWBOX,
  WORDMARK_DOT,
  WORDMARK_PATH,
} from './logoPaths';

const SIGNAL_GREEN = '#2BD46F';

interface Props {
  className?: string;
  /** Accessible name; omit when the logo sits inside a link that already has a label. */
  title?: string;
}

/** Hexagon monogram. Fills with `currentColor`. */
export function Monogram({ className, title }: Props) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path fillRule="evenodd" d={MONOGRAM_PATH} />
    </svg>
  );
}

/** Horizontal lockup: monogram + WRSOLID wordmark. Fills with `currentColor`; the dot stays green. */
export default function Logo({ className, title }: Props) {
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g transform={LOCKUP_MONOGRAM_TRANSFORM}>
        <path fillRule="evenodd" d={MONOGRAM_PATH} />
      </g>
      <g transform={LOCKUP_WORDMARK_TRANSFORM}>
        <path d={WORDMARK_PATH} />
        <circle cx={WORDMARK_DOT.cx} cy={WORDMARK_DOT.cy} r={WORDMARK_DOT.r} fill={SIGNAL_GREEN} />
      </g>
    </svg>
  );
}
