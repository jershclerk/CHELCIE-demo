import { useId } from "react"

type GrainTextureProps = {
  className?: string
}

export function GrainTexture({ className }: GrainTextureProps) {
  const filterId = useId()

  return (
    <svg className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  )
}
