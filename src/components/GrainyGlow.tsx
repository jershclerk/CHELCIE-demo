import { useId } from "react"

type GrainyGlowProps = {
  width: number
  height: number
  className?: string
  glowOpacity?: number
}

export function GrainyGlow({ width, height, className, glowOpacity = 0.7 }: GrainyGlowProps) {
  const filterId = useId()
  const gradientId = useId()

  return (
    <svg
      className={className ?? "pointer-events-none absolute top-0 left-0 z-0"}
      style={{ width, height }}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <g filter={`url(#${filterId})`}>
        <circle cx="-21.5" cy="-83.5" r="367.5" fill={`url(#${gradientId})`} />
      </g>
      <defs>
        <filter
          id={filterId}
          x="-389"
          y="-451"
          width="735"
          height="735"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.4285714626312256 1.4285714626312256"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="6452"
          />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
            />
          </feComponentTransfer>
          <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
          <feFlood floodColor="rgba(255, 255, 255, 0.45)" result="color1Flood" />
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
          <feMerge result="effect1_noise">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-21.5 -83.5) rotate(90) scale(367.5)"
        >
          <stop stopColor="#50DBBD" stopOpacity={glowOpacity} />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
