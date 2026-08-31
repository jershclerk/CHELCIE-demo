import { orbitRings, ORBIT_SIDES, ORBIT_ROTATION } from "@/lib/opportunities"

const PADDING = 24

function polygonPoints(radius: number, sides: number, rotationDeg: number): string {
  const pts: string[] = []
  for (let i = 0; i < sides; i++) {
    const angleRad = ((rotationDeg + (360 / sides) * i) * Math.PI) / 180
    pts.push(`${(radius * Math.cos(angleRad)).toFixed(2)},${(radius * Math.sin(angleRad)).toFixed(2)}`)
  }
  return pts.join(" ")
}

export function OrbitRings() {
  const maxR = Math.max(...orbitRings) + PADDING
  const size = maxR * 2

  return (
    <svg
      className="pointer-events-none absolute"
      style={{ left: -maxR, top: -maxR, width: size, height: size }}
      viewBox={`${-maxR} ${-maxR} ${size} ${size}`}
    >
      {orbitRings.map((r, i) => (
        <polygon
          key={i}
          points={polygonPoints(r, ORBIT_SIDES, ORBIT_ROTATION)}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.14}
          strokeWidth={1}
        />
      ))}
    </svg>
  )
}
