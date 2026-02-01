import { FONT_FAMILY } from '@/lib/constants'

type Props = {
  /** Progress 0–100 */
  progress: number
  /** Optional size in px (default 65). SVG viewBox is 66×66. */
  size?: number
}

const RADIUS = 30
const CIRCUMFERENCE = Math.PI * 2 * RADIUS

export function ProgressCircle({ progress, size = 65 }: Props) {
  const value = Math.min(100, Math.max(0, progress))
  const strokeDashoffset = CIRCUMFERENCE * (1 - value / 100)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 66 66"
      className="block"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    >
      <circle
        cx="33"
        cy="33"
        r={RADIUS}
        stroke="#2F2F2F"
        strokeWidth="3"
        fill="transparent"
      />
      <circle
        cx="33"
        cy="33"
        r={RADIUS}
        stroke="#5BF0A5"
        strokeWidth="3"
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 33 33)"
      />
      <text
        x="33"
        y="36"
        textAnchor="middle"
        fill="#FFFFFF"
        style={{ fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 14 }}
      >
        {Math.round(value)}%
      </text>
    </svg>
  )
}
